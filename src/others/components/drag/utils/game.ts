/**
 * 功能：游戏方法
 * 作者：安超
 * 日期：2019/11/18
 */

let knightPosition = [1, 7];
let observers = [];

function emitChange() {
    observers.forEach(o => {
        if (o) {
            o(knightPosition);
        }
    });
}

export function observe(o) {
    observers.push(o);
    emitChange();

    return () => {
        observers = observers.filter(t => t !== o);
    };
}

export function canMoveKnight(toX, toY) {
    const [x, y] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

export function moveKnigth(toX, toY) {
    knightPosition = [toX, toY];
    emitChange();
}
