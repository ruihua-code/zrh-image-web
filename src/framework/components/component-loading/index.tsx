/**
 * 功能：组件加载间隙动画
 * 作者：安超
 * 日期： 2018/5/3
 */

import React from 'react';
import styles from './scss/index.scss';

const Loading = function () {
    return (
        <div className={styles.loadingdiv}>
            <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            </div>
        </div>
    );
};

Loading.defaultProps = {};

Loading.propTypes = {};

export default Loading;
