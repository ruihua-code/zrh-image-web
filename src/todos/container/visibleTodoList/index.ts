/**
 * 功能：显示列表容器
 * 作者：安超
 * 日期：2017/6/29
 */

import { connect, createSelector } from 'framework/util';
import actionCreator from '../../actions/actionCreator';
import VisibleTodoList from '../../components/visible-todolist';
import Utils from '../../utils';

const todosSelector = state => state.todos;

const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: Utils.selectByFilter(oTodos.todoList.get('list'), oTodos.todoFilter).toJS()
}));

export default connect(todosByFilterSelector, actionCreator)(VisibleTodoList);
