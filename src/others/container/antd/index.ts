/**
 * 功能：antd容器
 * 作者：安超
 * 日期：2017/6/29
 */

import { connect, createSelector } from 'framework/util';
import actionCreator from '../../actions/actionCreator';
import AntdView from '../../components/antd';

const othersSelector = state => state.others;
const todosByFilterSelector = createSelector([othersSelector], others => ({
    names: others.antdTable.get('names').toJS()
}));

export default connect(todosByFilterSelector, actionCreator)(AntdView);
