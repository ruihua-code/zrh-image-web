/**
 * 功能： 页脚
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React } from 'framework/util';
import config from 'conf';
import classNames from 'classnames/bind';
import styles from './scss/index.scss';
import { GetTodosResponse } from '../../types';

const { constant } = config;

type FooterProps = {
    todos: GetTodosResponse;
    todoFilter: string;
    clearCompletedTodo: () => void;
    setFilter: (val: string) => void;
};

const Footer: React.FC<FooterProps> = function ({ todos, todoFilter, clearCompletedTodo, setFilter }) {
    function onRenderLi(filter, name) {
        if (filter === todoFilter) {
            return (
                <li>
                    <span role="presentation" className="selected" onClick={() => setFilter(filter)}>
                        {name}
                    </span>
                </li>
            );
        }
        return (
            <li>
                <span role="presentation" onClick={() => setFilter(filter)}>
                    {name}
                </span>
            </li>
        );
    }

    const nCompletedCount = todos.filter(oTodo => !oTodo.completed).length;
    const completedCls = classNames('pull-right', 'clear-completed', { hide: todos.length - nCompletedCount <= 0 });

    return (
        <footer className={classNames(styles.footerTodos, { hide: todos.length === 0 })}>
            <div id="todo-count" className="pull-left">
                <strong>{todos.length}</strong>
                items left
            </div>
            <ul className="filters list-unstyled list-inline">
                {onRenderLi(constant.VisibilityFilters.SHOW_ALL, 'All')}
                {onRenderLi(constant.VisibilityFilters.SHOW_ACTIVE, 'Active')}
                {onRenderLi(constant.VisibilityFilters.SHOW_COMPLETED, 'Completed')}
            </ul>
            <button type="button" className={completedCls} onClick={clearCompletedTodo}>
                Clear completed
            </button>
        </footer>
    );
};

export default React.memo(Footer);
