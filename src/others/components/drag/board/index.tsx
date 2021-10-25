/**
 * 功能: 画布
 * 作者: 安超
 * 日期: 2019/11/7 15:00
 */

import { React } from 'framework/util';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardSquare from '../board-square';
import Knight from '../knight';
import styles from './scss/index.scss';

type BoardProps = {
    knightPosition: [number, number];
};

const Board: React.FC<BoardProps> = function ({ knightPosition }) {
    const renderSquare = function (i, [knightX, knightY]) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isKnightHere = knightX === x && knightY === y;

        return (
            <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
                <BoardSquare x={x} y={y}>
                    {isKnightHere ? <Knight /> : null}
                </BoardSquare>
            </div>
        );
    };

    const squares = [];
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition));
    }
    return (
        <div className={styles.main}>
            <DndProvider backend={HTML5Backend}>{squares}</DndProvider>
        </div>
    );
};

export default React.memo(Board);
