/**
 * 功能：语言包
 * 作者：安超
 * 日期：2020/7/2
 */
import intl from 'react-intl-universal';

export default {
    enter() {
        return intl.get('global.enter');
    },
    cancel() {
        return intl.get('global.cancel');
    },
    delete() {
        return intl.get('global.delete');
    },
    title() {
        return intl.get('global.title');
    }
};
