/**
 * 功能：动作创建
 * 作者：安超
 * 日期：2017/6/29
 */
import { createAction, createActions } from 'framework';
import actionTypes from './actionTypes';

const actionCreator = createActions({
    getNameList: createAction(actionTypes.GET_ANTDTABLE_OTHERS)
});

export default actionCreator;
