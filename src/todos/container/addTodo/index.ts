/**
 * 功能：增加数据容器
 * 作者：安超
 * 日期：2017/6/29
 */
import { connect } from 'framework/util';
import actionCreator from '../../actions/actionCreator';
import AddTodo from '../../components/add-todo';

export default connect(null, actionCreator)(AddTodo);
