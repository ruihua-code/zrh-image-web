/**
 * 功能：受限入口组件容器
 * 作者：安超
 * 日期：2017/6/29
 */
import { createSelector, connect, hot } from 'framework/util';
import actionCreator from '@/login/actions/actionCreator';
import App from '../../components/app';

const userInfo = state => state.login;
const selector = createSelector([userInfo], login => ({
    username: login.get('username'),
    userType: login.get('userType')
}));

export default connect(selector, actionCreator)(hot(module)(App));
