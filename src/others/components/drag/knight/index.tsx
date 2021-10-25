/**
 * 功能: Knight
 * 作者: 安超
 * 日期: 2019/11/7 14:21
 */

import { React } from 'framework/util';
import { useDrag } from 'react-dnd';
import ItemTypes from './types/constant';
import styles from './scss/index.scss';

function Knight() {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.KNIGHT },
        collect: monitor => ({
            isDragging: Boolean(monitor.isDragging())
        })
    });

    return (
        <div
            className={styles.knight}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
        >
            〠
        </div>
    );
}

export default React.memo(Knight);
