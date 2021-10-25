/**
 * 功能：动作创建
 * 作者：安超
 * 日期：2017/6/29
 */

import { createAction, createActions } from 'framework';
import config from 'conf';
import actionTypes from './actionTypes';

const {
    constant: { mockPrefix }
} = config;

const actionCreator = createActions({
    getAllTodo: {
        url: `${mockPrefix}/todos`,
        method: 'GET',
        hasLoading: true,
        actionType: actionTypes.GET_ALL_TODO
    },
    addTodo: {
        url: `${mockPrefix}/todos`,
        method: 'POST',
        handleError: true,
        needFormData: true,
        actionType: actionTypes.ADD_TODO
    },
    removeTodo: {
        url: `${mockPrefix}/todos`,
        method: 'DELETE',
        handleError: true,
        actionType: actionTypes.REMOVE_TODO
    },
    updateTodo: {
        url: `${mockPrefix}/todos`,
        method: 'PUT',
        handleError: true,
        needFormData: true,
        actionType: actionTypes.UPDATE_TODO
    },
    checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO),
    setFilter: createAction(actionTypes.SET_VISIBILITY_FILTER),
    clearCompletedTodo: createAction(actionTypes.CLEAR_COMPLETED_TODO)
});

export default actionCreator;
