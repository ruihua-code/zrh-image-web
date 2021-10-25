/**
 * 功能：API接口
 * 作者：安超
 * 日期：2017/6/29
 */
import * as actionCreator from './actions/actionCreator';
import store from '../store-common';

type TLoading = {
    show: boolean;
    invokeCount: number;
};

const loading = {
    show() {
        store.dispatch(actionCreator.showLoading());
        return this;
    },

    hide() {
        store.dispatch(actionCreator.hideLoading());

        return this;
    },

    getLoadingStatus() {
        return (store.getState().loading as TLoading).show;
    },

    increaseInvoke() {
        store.dispatch(actionCreator.increaseInvoke());

        return this;
    },

    decreaseInvoke() {
        store.dispatch(actionCreator.decreaseInvoke());

        return this;
    },

    getInvokeCount() {
        return (store.getState().loading as TLoading).invokeCount;
    }
};

export default loading;
