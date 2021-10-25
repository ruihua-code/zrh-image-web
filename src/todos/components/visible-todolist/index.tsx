/**
 * 功能：可视todo列表
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, Helper, classNames } from 'framework/util';
import TodoVis from '../../container/visible-todo';
import styles from './scss/index.scss';
import { GetTodosResponse } from '../../types';

type VisibleTodoListProps = {
    todos: GetTodosResponse;
    getAllTodo: () => Promise<ApiResponse<GetTodosResponse>>;
    checkedAllTodo: (val: boolean) => void;
};

const VisibleTodoList: React.FC<VisibleTodoListProps> = function ({ todos, getAllTodo, checkedAllTodo }) {
    Helper.ComDidMount(React.useEffect, () => {
        if (todos.length === 0) getAllTodo();
    });

    const bCheckedAll = todos.filter(item => item.completed).length === todos.length;
    return (
        <section className={styles.mainTodos}>
            <input
                className={styles.toggleAll}
                type="checkbox"
                checked={bCheckedAll}
                onChange={() => checkedAllTodo(!bCheckedAll)}
            />
            <ul className={classNames(styles.todoList, 'list-unstyled')}>
                {todos.length === 0 && (
                    <li>
                        <div className={classNames(styles.view, 'text-center')}>没有数据！</div>
                    </li>
                )}
                {todos.length > 0 &&
                    todos.map(oTodo => <TodoVis key={`${oTodo.id}-${oTodo.completed}`} data={oTodo} />)}
            </ul>
        </section>
    );
};

export default VisibleTodoList;
