/**
 * 功能：拖拽功能实现
 * 作者：安超
 * 日期：2018/7/6
 */

import { React } from 'framework/util';
import Board from '../board';

const DragView = function () {
    return <Board knightPosition={[1, 7]} />;
};

export default React.memo(DragView);
