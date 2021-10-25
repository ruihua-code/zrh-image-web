import { createActions, createAction } from 'framework';
import config from '@/conf';
import actionTypes from './actionTypes';

const actionCreator = createActions({
    //    这里写具体的请求
    //    异步请求的格式如下
    //     actionName: {
    //         url: '请求地址',
    //         method: 'GET/POST/PUT/DELETE', // 其中之一 默认为GET
    //         actionType: ./actionTypes这里的常量之一, 如不需要操作reducers里的值，可不写
    //         hasLoading: true/false 非必填，默认为true
    //         log: { // 这里用来记录日志，如不需要可不写
    //             opId: 一个唯一的日志ID数字,
    //             content: 日志的描述内容,
    //             isAutoSend: true, //是否自动发送日志，主要是调用接口时需要设置，有些场景需要统计用户实际点击，但有的接口在组件初始化时被调用此时不需要计入统计范围，此时需要置该参数为false
    //             afterSuccess: false, //是否在成功调用接口后再进行日志的统计
    //             getContent(payload, state){
    //                当content内容不能写死时，需要动态设置时可以使用此方法
    //             },
    //             getOpId(payload, state) {
    //                 当opId不能写死时，需要动态设置时可以使用此方法
    //             }
    //         },
    //     },
    //     同步操作reducres格式如下
    //     actionName: createAction(./actionTypes这里的常量之一, 如不需要操作reducers里的值),
    getCode: {
        url: '/api/users/code',
        method: 'GET'
    }
});

export default actionCreator;
