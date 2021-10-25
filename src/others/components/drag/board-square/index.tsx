/**
 * 功能: 面板小板
 * 作者: 安超
 * 日期: 2019/11/8 15:30
 */

import { React } from 'framework/util';
import Square from '../square';

type BoardSquareProps = React.PropsWithChildren<{
    x: number;
    y: number;
}>;

const BoardSquare: React.FC<BoardSquareProps> = function ({ x, y, children = null }) {
    return <Square black={(x + y) % 2 === 0}>{children}</Square>;
};

export default React.memo(BoardSquare);
