/**
 * 功能: Square组件
 * 作者: 安超
 * 日期: 2019/11/7 14:23
 */

import { React, classNames } from 'framework/util';
import styles from './scss/index.scss';

type SquareProps = React.PropsWithChildren<{
    black: boolean;
}>;

const Square: React.FC<SquareProps> = function ({ black = true, children = null }) {
    return <div className={classNames(styles.square, { black, white: !black })}>{children}</div>;
};

export default React.memo(Square);
