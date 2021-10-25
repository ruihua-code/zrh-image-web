/**
 * 功能：显示列容器
 * 作者：安超
 * 日期：2017/6/29
 */

import { connect, createSelector } from 'framework/util';
import actionCreator from '../../actions/actionCreator';
import VisibleTodo from '../../components/visible-todo';

export default connect(null, actionCreator)(VisibleTodo);
