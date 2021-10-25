/**
 * 功能：语言包
 * 作者：安超
 * 日期：2020/7/5
 */

import { intl } from 'framework/util';

export default {
    login: intl.get('login.login'),
    normal: intl.get('login.normal'),
    admin: intl.get('login.admin'),
    usernameErrorMsg() {
        return intl.get('login.usernameErrorMsg');
    },
    usernamePlaceholder: intl.get('login.usernamePlaceholder'),
    passwordErrorMsg: intl.get('login.passwordErrorMsg'),
    passwordPlaceholder: intl.get('login.passwordPlaceholder'),
    roleErrorMsg: intl.get('login.roleErrorMsg')
};
