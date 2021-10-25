/**
 * 功能：语言包
 * 作者：安超
 * 日期：2020/7/2
 */
import intl from 'react-intl-universal';

export default {
    error() {
        return intl.get('global.error');
    },
    errorMsg() {
        return intl.get('global.errorMsg');
    },
    reason() {
        return intl.get('global.reason');
    },
    modalTitle() {
        return intl.get('global.modalTitle');
    },
    crashMsg() {
        return intl.get('global.crashMsg');
    },
    componentStack() {
        return intl.get('global.componentStack');
    },
    crashReason() {
        return intl.get('global.crashReason');
    }
};
