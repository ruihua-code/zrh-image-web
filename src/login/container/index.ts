/**
 * 功能：登录容器
 * 作者：安超
 * 日期：2018/7/4
 */

import { connect, createSelector, hot } from 'framework/util';
import Login from '../components/login';
import actionCreator from '../actions/actionCreator';

const login = state => state.login;

const userSelector = createSelector([login], user => ({ userType: user.get('userType') }));

export default connect(userSelector, actionCreator)(hot(module)(Login));
