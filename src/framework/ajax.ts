/**
 * 功能：ajax 统一配置
 * 作者：安超
 * 日期：2019-05-30
 */
import axios from 'axios';
import qs from 'qs';
import loading from 'framework/loading';
import { pathToRegexp } from 'path-to-regexp';

const packageLogInfo = function (operateCondition, opId?) {
    const {
        innerWidth,
        innerHeight,
        screen: { availWidth, availHeight }
    } = window;

    /**
     * 删除 browserLanguage (IE6，7，8 support, 非标准属性)
     * 当前脚手架不考虑IE9-
     */
    // const { userAgent, language, browserLanguage } = window.navigator
    const { userAgent, language } = window.navigator;
    const browserInfo = userAgent.toLowerCase();
    let browser = {
        browserName: 'Other',
        browserVersion: '未知'
    };

    // ie
    if (browserInfo.indexOf('msie') >= 0) {
        const ver = browserInfo.match(/msie ([\d.]+)/)[1];
        browser = { browserName: 'IE', browserVersion: ver };
    }
    // firefox
    if (browserInfo.indexOf('firefox') >= 0) {
        const ver = browserInfo.match(/firefox\/([\d.]+)/)[1];
        browser = { browserName: 'Firefox', browserVersion: ver };
    }
    // Chrome
    if (browserInfo.indexOf('chrome') >= 0) {
        const ver = browserInfo.match(/chrome\/([\d.]+)/)[1];
        browser = { browserName: 'Chrome', browserVersion: ver };
    }
    // Opera
    if (browserInfo.indexOf('opera') >= 0) {
        const ver = browserInfo.match(/opera.([\d.]+)/)[1];
        browser = { browserName: 'Opera', browserVersion: ver };
    }
    // Safari
    if (browserInfo.indexOf('Safari') >= 0) {
        const ver = browserInfo.match(/version\/([\d.]+)/)[1];
        browser = { browserName: 'Safari', browserVersion: ver };
    }

    return {
        browser: browser.browserName,
        browserVersion: browser.browserVersion,
        language,
        location: window.location.href,
        resolution: `${innerWidth}x${innerHeight}`,
        windowSize: `${availWidth}x${availHeight}`,
        operateCondition: typeof operateCondition === 'object' ? JSON.stringify(operateCondition) : operateCondition,
        opId
    };
};

// ajax 统一配置
const instance = axios.create({
    method: 'get',
    baseURL: '',
    timeout: 0,
    responseType: 'json',
    paramsSerializer: params => qs.stringify(params, { indices: false })
});

instance.interceptors.request.use(
    config => ({
        ...config,
        cancelToken: new axios.CancelToken(cancel => {
            window.projectConf.cancelToken[config.headers.eventName] = cancel;
        })
    }),
    err => Promise.reject(err)
);

const handleWithParameter = function (
    url,
    {
        method = 'GET',
        headers = {},
        contentType = 'application/json; charset=UTF-8',
        params = {},
        data = {},
        hasLoading = true,
        eventName,
        extra
    }
): Promise<any> {
    const locHref = window.location.href;
    const firstShapeIndex = locHref.indexOf('#');
    const lastShapeIndex = locHref.lastIndexOf('#');
    const Location = `${locHref.slice(0, firstShapeIndex)}${locHref.slice(lastShapeIndex)}`;

    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...headers,
        Location,
        eventName,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType,
        ...window.projectConf.authHeader
    };

    // url替换参数
    let urlNew = url;
    const strParams = [];
    const paramsNew = { ...params };

    // 可选参数可以不用传，默认会被替换为空串
    const outputKeys = [];
    pathToRegexp(urlNew, outputKeys);
    outputKeys.forEach(item => {
        // 自动补齐未传可选参数
        if (paramsNew[item.name] === undefined) {
            paramsNew[item.name] = '';
        }
    });

    const keys = Object.keys(paramsNew);
    keys.forEach(key => {
        const reg1 = new RegExp(`:${key}\\?`, 'gm');
        const reg2 = new RegExp(`:${key}`, 'gm');

        if (reg1.test(urlNew) || reg2.test(urlNew)) {
            urlNew = urlNew.replace(reg1, paramsNew[key]).replace(reg2, paramsNew[key]);
            delete paramsNew[key];
        } else {
            strParams.push(`${key}=${paramsNew[key]}`);
        }
    });

    // 如果设置了显示，并隐藏时，则触发显示
    if (hasLoading && !loading.getLoadingStatus()) {
        loading.show();
    }

    // 设置了加载，则自动计数
    if (hasLoading) {
        loading.increaseInvoke();
    }

    // 动态method覆盖
    let ajaxMethod = method.toLowerCase();
    if (extra.method) {
        ajaxMethod = extra.method.toLowerCase();
    }

    switch (ajaxMethod) {
        case 'get':
            return instance.get(urlNew, { params: paramsNew });
        case 'delete':
            return instance.delete(urlNew, { params: paramsNew, data });
        case 'post':
            return instance.post(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} });
        case 'put':
            return instance.put(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} });
        default: {
            const res = {
                then: resolve =>
                    resolve({
                        statusCode: 300,
                        message: 'method params error!'
                    })
            };
            return Promise.resolve(res);
        }
    }
};

// 发送日志接口
const sendLog = function ({
    opId = -1,
    content = '',
    payload = {},
    state = {},
    statusCode
}: {
    opId: number | ((payload: Record<string, any>, state: Record<string, any>) => number);
    content: string | ((payload: Record<string, any>, state: Record<string, any>) => Record<string, any>);
    payload?: Record<string, any>;
    state?: Record<string, any>;
    statusCode?: number;
}) {
    return new Promise(resolve => {
        const operateId = typeof opId === 'number' ? opId : opId(payload, state);
        // 埋点内容
        let operateContent = content;
        let operateContentObj: Record<string, any> = {};
        // ajax请求地址，有可能为前端界面操作，此值为空
        // 先从调用参数中查找，然后在content中查找
        let requestURL = '';

        if (payload?.extra) {
            requestURL = payload.extra.requestURL;
        }

        if (typeof content === 'string') {
            try {
                const jsonContent: any = JSON.parse(content);
                requestURL = requestURL || jsonContent.requestURL;
                operateContent = jsonContent.content || content;

                try {
                    operateContentObj =
                        typeof operateContent === 'string' ? JSON.parse(operateContent) : operateContent;
                } catch {
                    operateContentObj = {
                        content: operateContent
                    };
                }
            } catch (e) {
                operateContentObj = {
                    content
                };
            }
        } else {
            operateContentObj = content(payload, state);
        }

        setTimeout(
            () =>
                handleWithParameter('/api/sendLog', {
                    method: 'post',
                    hasLoading: false,
                    data: {
                        content: packageLogInfo({
                            opId: `example-${operateId}`,
                            content: {
                                requestURL,
                                operateContentObj,
                                statusCode
                            }
                        })
                    },
                    eventName: 'cancelSendLog',
                    extra: payload.extra
                }).then(resolve),
            1000
        );
    });
};

export { handleWithParameter, sendLog };
