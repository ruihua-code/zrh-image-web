/**
 * 功能：非业务底层扩展封装
 * 作者：安超
 * 日期：2017/6/29
 */
import * as React from 'react';
import {
    createAction as originalCreateAction,
    handleAction,
    handleActions as originalHandleActions,
    combineActions
} from 'redux-actions';
import loadable from '@loadable/component';
import qs from 'qs';
import { message as mesAntd } from 'antd';
import loading from './loading';
import { handleWithParameter, sendLog } from './ajax';
import ComLoading from './components/component-loading';

const noop = () => { };

/*
 * pre: ajax提交前
 * success: ajax连接成功返回正确结果后
 * error: ajax连接成功返回错误结果后
 * fail: ajax连接失败（网络错误）
 * always: ajax无论成功与失败都要执行
 */
const suffix = ['pre', 'success', 'error', 'fail', 'always'];
const afterSuccessValue = {
    NO: 'no',
    YES: 'yes',
    ALWAYS: 'always'
};

/* 日志记录
 * log为actionCreator内配置参数，log为视图调用时传入的配置， 支持对象和布尔false
 * opId 日志id,
 * content: 日志内容,
 * isAutoSend: 是否自动发送日志，有些场景是需要用户触发才会记录日志，初始化界面时发送请求不需要记录到日志
 * afterSuccess: 发送日志的时机，是在接口成功之后还是调用接口之前，值取no|yes|always，
 * getContent: 动态获得content，优先级低于content，
 * getOpId: 动态获得埋点id，优先级低于opId
 */
const logConf = {
    opId: -1,
    content: '',
    isAutoSend: true,
    afterSuccess: afterSuccessValue.NO,
    getContent: noop,
    getOpId: noop
};

// 初始化工程中的所有state
const projectInitState = 'PROJECT_INIT_STATE_PUBLIC';

// 增强createAction

// todo setting type any
const createAction =
    (settings: string | Record<string, any> = {}) =>
        payload => {
            // settings在actionCreator里配置，payload在view里调用时传入，支持log: false写法
            // 判断log在哪里配置
            const isInActionCreator = typeof settings !== 'string';
            const isInView = !!payload && payload.log !== undefined;

            if (!isInActionCreator && !isInView) {
                return dispatch => {
                    dispatch(originalCreateAction(settings)(payload));
                };
            }

            // todo mizi
            // eslint-disable-next-line no-param-reassign
            settings = settings as Record<string, any>;

            const { log } = settings as Record<string, any>;
            let { actionType } = settings;
            let { log: newLog, ...rest } = payload;

            if (!isInActionCreator) {
                actionType = settings;
            }

            if (!isInView) {
                rest = payload;
            }

            if (newLog === false) {
                newLog = { isAutoSend: false };
            }

            const logConfig = {
                ...logConf,
                ...log,
                ...newLog
            };

            return (dispatch, getState) => {
                dispatch(originalCreateAction(actionType)(rest));
                // 前置Pre action调用接口时发送，避免重复
                if (logConfig.isAutoSend && !/_PRE$/i.test(actionType)) {
                    sendLog({
                        opId: logConfig.opId === -1 ? logConfig.getOpId : logConfig.opId,
                        content: logConfig.content.length === 0 ? logConfig.getContent : logConfig.content,
                        payload: isInActionCreator ? rest : settings,
                        state: getState()
                    });
                }
            };
        };

// 增强createActions, 可以配置{}
type ActType = {
    url: string;
    method?: string;
    actionType?: string;
    hasLoading?: boolean;
    handleError?: boolean;
    needFormData?: boolean;
    log?: {
        opId?: number;
        content?: string;
        isAutoSend?: boolean;
        afterSuccess?: string;
        getContent?: (payload: any, state: any) => void;
        getOpId?: (payload: any, state: any) => void;
    };
    // [x: string]: any;
};

type Fn = (payload: any) => (dispatch: any, getState: Function) => void;

const createActions = function (actionMap: Record<string, ActType | Fn>) {
    const eventNames = Object.keys(actionMap);
    const fnsMap = {
        projectInit: createAction(projectInitState),
        sendLog:
            ({ opId, content }) =>
                (dispatch, getState) => {
                    sendLog({
                        opId,
                        content,
                        payload: {},
                        state: getState()
                    });
                }
    };
    eventNames.forEach(eventName => {
        const configOrFn = actionMap[eventName];

        if (typeof configOrFn !== 'function') {
            const { log = {}, ...rest } = configOrFn;
            const config = {
                method: 'GET',
                actionType: 'hasNotConfigActionType',
                hasLoading: true,
                handleError: true,
                ...rest
            };

            fnsMap[eventName] =
                (oSettings: any = {}) =>
                    (dispatchFn, getState) => {
                        const settings = {
                            ...oSettings,
                            extra: {
                                preventDefault: false,
                                requestURL: config.url,
                                ...(oSettings.extra === undefined ? {} : oSettings.extra)
                            }
                        };
                        // 配置actionType后，不执行此action时使用
                        const dispatch = settings?.extra?.preventDefault ? noop : dispatchFn;
                        // 在发ajax之前控制loading画面并计算调用次数
                        // if ((config.hasLoading) && !loading.getLoadingStatus()) loading.show()

                        const logConfig = {
                            ...logConf,
                            ...log,
                            ...(settings.log ? settings.log : {})
                        };

                        const logParams = {
                            opId: logConfig.opId === -1 ? logConfig.getOpId : logConfig.opId,
                            content: logConfig.content.length === 0 ? logConfig.getContent : logConfig.content,
                            payload: settings,
                            state: getState()
                        };
                        // 配置了log
                        const needSendLogBefore =
                            (log === false ||
                                Object.keys(log).length > 0 ||
                                settings.log === false ||
                                (settings.log !== undefined && Object.keys(settings.log).length > 0)) &&
                            logParams.opId !== -1 &&
                            logConfig.isAutoSend &&
                            logConfig.afterSuccess === afterSuccessValue.NO;
                        if (needSendLogBefore) {
                            sendLog(logParams);
                        }

                        dispatch(createAction(`${config.actionType}_PRE`)(settings));
                        // 取消函数名称
                        let cancelFnName = `cancel${eventName.replace(
                            /\b(\w)(\w*)/g,
                            ($0, $1, $2) => $1.toUpperCase() + $2
                        )}`;
                        if (settings?.params?.tokenId) {
                            cancelFnName += settings.params.tokenId;
                        }

                        let logStatusCode = 200;
                        return handleWithParameter(config.url, {
                            ...settings,
                            ...config,
                            eventName: cancelFnName
                        })
                            .then(res => {
                                if (config.hasLoading && loading.getLoadingStatus()) {
                                    loading.decreaseInvoke();
                                    setTimeout(() => {
                                        if (loading.getInvokeCount() === 0) {
                                            loading.hide();
                                        }
                                    }, 30);
                                }

                                const { statusCode, message } = res.data;
                                logStatusCode = statusCode;
                                const params = res.config.params === undefined ? res.config.data : res.config.params;
                                const dt = qs.parse(params);

                                // todo data type any
                                // by mizi
                                let data: any = {};
                                // 是否需要接口传递的参数
                                if (config.needFormData) {
                                    data = { data: res };
                                } else {
                                    data = res.data.data === undefined ? { ...res.data, data: dt } : res.data;
                                }

                                if (!needSendLogBefore && logConfig.afterSuccess === afterSuccessValue.YES) {
                                    sendLog({
                                        ...logParams,
                                        statusCode
                                    });
                                }

                                switch (statusCode) {
                                    case 200: {
                                        // always只有在成功时才返回数据，非200或异常都不返回数据
                                        dispatch(createAction(`${config.actionType}_SUCCESS`)(data.data));
                                        dispatch(createAction(`${config.actionType}_ALWAYS`)(data.data));

                                        return res.data;
                                    }
                                    case 302: {
                                        // 302时默认跳转到指定页面，接口要求返回绝对地址
                                        window.location.replace(res.data.data);
                                        break;
                                    }
                                    case 403: {
                                        // 403权限问题，拒绝访问无权限直接跳转到无权限页
                                        window.location.replace(`${window.location.origin}/permission-denied`);
                                        break;
                                    }
                                    case 500: {
                                        // 500服务器端口异常
                                        window.location.replace(`${window.location.origin}/server-error`);
                                        break;
                                    }
                                    default: {
                                        if (config.handleError) {
                                            mesAntd.error(message);
                                        }

                                        dispatch(createAction(`${config.actionType}_ERROR`)(message));
                                        // todo params null
                                        dispatch(createAction(`${config.actionType}_ALWAYS`)(null));

                                        return res.data;
                                    }
                                }

                                return res.data;
                            })
                            .catch(({ message, response }) => {
                                loading.hide();

                                if (response) {
                                    dispatch(createAction(`${config.actionType}_FAIL`)(null));
                                    dispatch(createAction(`${config.actionType}_ALWAYS`)(null));
                                    mesAntd.error(`${response.statusText}😂！`);
                                    logStatusCode = response.status;
                                    return {
                                        statusCode: response.status,
                                        message: response.statusText
                                    };
                                }

                                if (message && config.handleError) {
                                    mesAntd.error(`${message}！`);
                                } else {
                                    console.log(`unknown error ${message}😂！`);
                                }

                                logStatusCode = 500;
                                return {
                                    statusCode: logStatusCode,
                                    message
                                };
                            })
                            .finally(() => {
                                // 回收cancel`eventName`函数
                                delete window.projectConf.cancelToken[cancelFnName];
                                if (!needSendLogBefore && logConfig.afterSuccess === afterSuccessValue.ALWAYS) {
                                    sendLog({
                                        ...logParams,
                                        statusCode: logStatusCode
                                    });
                                }
                            });
                    };
        } else {
            fnsMap[eventName] = configOrFn;
        }
    });
    return fnsMap;
};

// 定义reducer使用的function
export type ReducerFunction<S, A> = (state: S, action?: A) => S;

// 定义reducer具体项的值： 包含function或者对象
export type ReducerItem<S, A> =
    | ReducerFunction<S, A>
    | {
        success: ReducerFunction<S, A>;
        pre?: ReducerFunction<S, A>;
        error?: ReducerFunction<S, A>;
        always?: ReducerFunction<S, A>;
    };

// 增强handleActions，可以配置{}
const handleActions = function <T>(reducerMap: Record<string, ReducerItem<T, { payload: any }>>, defaultState: T) {
    const result = { ...reducerMap };
    Object.keys(result).forEach(actionType => {
        const fnOrObject = result[actionType];
        if (fnOrObject && typeof fnOrObject !== 'function') {
            delete result[actionType];
            const keys = Object.keys(fnOrObject);
            // 补充没有的默认配置
            suffix.forEach(str => {
                if (!keys.includes(str)) {
                    keys.push(str);
                    fnOrObject[str] = state => state;
                }
            });

            keys.forEach(suffixAction => {
                result[`${actionType}_${suffixAction.toUpperCase()}`] = fnOrObject[suffixAction];
            });
        }
    });

    result[projectInitState] = function () {
        window.localStorage.clear();
        return defaultState;
    };

    return originalHandleActions(result, defaultState);
};

// 懒加载组件
const lazyload = importUrl => {
    return loadable(() => importUrl, {
        fallback: <ComLoading />
    });
};

export {
    createAction,
    originalCreateAction,
    createActions,
    handleAction,
    handleActions,
    originalHandleActions,
    combineActions,
    lazyload
};
