/**
 * 功能：增加todo组件
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React } from 'framework/util';
import dialog from 'dialog';
import styles from './scss/index.scss';
import { PostTodosRequest, PostTodosResponse } from '../../types/index';

type AddTodoProps = {
    addTodo: ({ data: PostTodosRequest }) => Promise<ApiResponse<PostTodosResponse>>;
};

const AddTodo: React.FC<AddTodoProps> = function ({ addTodo }) {
    const addTodoEv = e => {
        if (e.which === 13) {
            const sTxt = e.currentTarget.value.trim() as string;
            if (sTxt.length > 0) {
                addTodo({
                    data: { id: Date.now(), text: sTxt, completed: false }
                });
                e.currentTarget.value = '';
            } else {
                dialog.alert({
                    infoType: 'error',
                    content: <div>内容不能为空</div>
                });
            }
        }
    };

    return (
        <div className={styles.header}>
            <h1>todos</h1>
            <input className={styles.newtodoTodos} placeholder="What needs to be done?" onKeyDown={addTodoEv} />
        </div>
    );
};

export default React.memo(AddTodo);
