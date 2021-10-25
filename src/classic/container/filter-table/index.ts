/**
 * 功能：antd容器
 * 作者：安超
 * 日期：2017/6/29
 */

import { connect } from 'framework/util';
import actionCreator from '../../actions/actionCreator';
import View from '../../components/filter-table';

export default connect(null, actionCreator)(View);
