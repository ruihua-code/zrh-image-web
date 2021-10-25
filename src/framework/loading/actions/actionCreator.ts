/**
 * 功能：动作定义
 * 作者：安超
 * 日期：2017/6/29
 */
import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const showLoading = createAction(actionTypes.SHOWLOADING_COMMON);
export const hideLoading = createAction(actionTypes.HIDELOADING_COMMON);
export const increaseInvoke = createAction(actionTypes.INCREASEINVOKE_COMMON);
export const decreaseInvoke = createAction(actionTypes.DECREASEINVOKE_COMMON);
