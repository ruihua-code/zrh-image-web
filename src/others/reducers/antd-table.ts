/**
 * 功能：过滤参数
 * 作者：安超
 * 日期： 2018/3/26
 */

import { handleActions } from 'framework';
import { Immutable } from 'framework/util';
import actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({
    names: [
        {
            name: '胡彦斌',
            age: 32,
            address: '朝阳区湖底公园1号'
        },
        {
            name: '吴彦祖',
            age: 42,
            address: '东城区湖底公园1号'
        },
        {
            name: '张三丰',
            age: 42,
            address: '海淀区湖底公园1号'
        }
    ]
});
const antdTable = handleActions<Immutable.Map<string, any>>(
    {
        [actionTypes.SET_ANTDTABLE_OTHERS](state, action) {
            return state.set('names', Immutable.fromJS(action.payload));
        }
    },
    initialState
);

export default antdTable;
