/**
 * 功能：入口页
 * 作者：安超
 * 日期：2017/6/29
 */
import { React, hot } from 'framework/util';
import AddTodoView from '../../container/addTodo';
import TodoListView from '../../container/visibleTodoList';
import FooterView from '../../container/footer';
import styles from './scss/index.scss';

const TodoMain: React.FC = function () {
    return (
        <div className={styles.todoContainer}>
            <div className={styles.todomainTodos}>
                <AddTodoView />
                <TodoListView />
                <FooterView />
            </div>
        </div>
    );
};

export default hot(module)(React.memo(TodoMain));
