/**
 * 功能： todos列表
 * 作者：安超
 * 日期： 2018/3/26
 */
import { handleActions } from 'framework';
import { Immutable } from 'framework/util';
import actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({
    isLoading: false,
    list: []
});

const todoList = handleActions<Immutable.Map<string, any>>(
    {
        [actionTypes.GET_ALL_TODO]: {
            pre: state => state.set('isLoading', true),
            success: (state, action) => state.set('list', Immutable.fromJS(action.payload)),
            error: state => state.set('isLoading', false),
            always: state => state.set('isLoading', false)
        },
        [actionTypes.ADD_TODO]: {
            success: (state, action) =>
                state.update('list', list => {
                    const { id, text, completed } = JSON.parse(action.payload.config.data);
                    return list.unshift(
                        Immutable.fromJS({
                            id: Number(id),
                            completed: Boolean(completed),
                            text
                        })
                    );
                })
        },
        [actionTypes.REMOVE_TODO]: {
            success: (state, action) =>
                state.update('list', list => list.filter(item => item.get('id') !== Number(action.payload.id)))
        },
        [actionTypes.UPDATE_TODO]: {
            success: (state, action) => {
                const { id, completed, text } = JSON.parse(action.payload.config.data);
                const index = state.get('list').findIndex(item => item.get('id') === Number(id));

                if (completed !== undefined) {
                    return state.setIn(['list', index, 'completed'], Boolean(completed));
                }

                if (text !== undefined) {
                    return state.setIn(['list', index, 'text'], text);
                }

                return state;
            }
        },
        [actionTypes.CHECKED_ALL_TODO](state, action) {
            return state.update('list', list => list.map(oTodo => oTodo.set('completed', action.payload)));
        },
        [actionTypes.CLEAR_COMPLETED_TODO](state) {
            return state.update('list', list => list.filter(oTodo => !oTodo.get('completed')));
        }
    },
    initialState
);

export default todoList;
