/**
 * 功能：所有动作配置
 * 作者：安超
 * 日期： 2018/3/19
 */

import { createActions } from 'framework';
import config from 'conf';
import actionTypes from './actionTypes';

const {
    constant: { mockPrefix }
} = config;
const actionCreator = createActions({
    login: {
        url: `${mockPrefix}/login`,
        method: 'post'
    },
    logout: {
        url: `${mockPrefix}/logout`
    },
    getUserInfo: {
        url: `${mockPrefix}/getUserInfo`,
        actionType: actionTypes.SET_USER_INFO_LOGIN
    }
});

export default actionCreator;
