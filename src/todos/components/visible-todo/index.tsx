/**
 * 功能：显示列表
 * 作者：安超
 * 日期：2017/6/29
 */
import { React, PureComponent, classNames } from 'framework/util';
import dialog from 'dialog';
import styles from '../visible-todolist/scss/index.scss';
import { DeleteTodosRequest, DeleteTodosResponse, PutTodosRequest, PutTodosResponse } from '../../types';

type DataInterface = {
    id: number;
    text: string;
    completed: boolean;
};
type TodoSingleProps = {
    data: DataInterface;
    removeTodo: ({ params: DeleteTodosRequest }) => Promise<ApiResponse<DeleteTodosResponse>>;
    updateTodo: ({ data: PutTodosRequest }) => Promise<ApiResponse<PutTodosResponse>>;
};

const TodoSingle: React.FC<TodoSingleProps> = function ({ data, removeTodo, updateTodo }) {
    const [dataObj, setDataObj] = React.useState(data);
    const [hideDelIcon, setHideDelIcon] = React.useState(true);
    const [hideEditInput, setHideEditInput] = React.useState(true);

    const todoRemove = () => {
        removeTodo({ params: { id: dataObj.id } });
    };

    const finishNameEdit = e => {
        if (e.which === 13) {
            setHideEditInput(true);
            e.preventDefault();
        }
    };

    const todoUpdate = (e, todoKey) => {
        const text = e.currentTarget.value;

        setDataObj(preState => {
            const { id, completed } = preState;
            switch (todoKey) {
                case 'completed':
                    updateTodo({ data: { id, completed: !completed } }).then(res => {
                        if (res.statusCode !== 200) {
                            dialog.alert({
                                infoType: 'error',
                                content: <div>{res.message}</div>
                            });
                        }
                    });
                    return { ...preState, completed: !completed };
                case 'text':
                    return { ...preState, text };
                default:
                    return preState;
            }
        });
    };

    return (
        <li
            onMouseEnter={() => setHideDelIcon(false)}
            onMouseLeave={() => setHideDelIcon(true)}
            onDoubleClick={() => setHideEditInput(false)}
            key={data.id}
        >
            <div className={classNames('view', { hide: !hideEditInput })}>
                {dataObj.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135">
                        <circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" strokeWidth="3" />
                        <path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135">
                        <circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" strokeWidth="3" />
                    </svg>
                )}
                <input
                    className={styles.toggle}
                    type="checkbox"
                    checked={dataObj.completed}
                    onChange={e => todoUpdate(e, 'completed')}
                />
                <div className={classNames(styles.normal, { completed: dataObj.completed })}>{dataObj.text}</div>
                <button
                    type="button"
                    className={classNames(styles.destroy, { hide: hideDelIcon })}
                    onClick={todoRemove}
                />
            </div>
            <input
                className={classNames(styles.edit, { hide: hideEditInput })}
                value={dataObj.text}
                onChange={e => todoUpdate(e, 'text')}
                onKeyDown={finishNameEdit}
            />
        </li>
    );
};

export default TodoSingle;
