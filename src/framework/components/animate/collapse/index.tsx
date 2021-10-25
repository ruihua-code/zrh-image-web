/**
 * 功能: 折叠效果
 * 作者: 安超
 * 日期: 2020/6/23 17:29
 */

import React from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import styles from './scss/index.scss';

type ICollaspe = React.PropsWithChildren<{
    className: string;
    in: boolean;
    timeout?: number;
}>;

const defaultProps = {
    timeout: 500
};

function Collapse(props: ICollaspe & typeof defaultProps) {
    const nodeRef = React.useRef(null);
    const { className, ...rest } = props;

    /* -- Expanding -- */
    const handleEnter = () => {
        nodeRef.current.style.height = '0px';
    };

    const handleEntering = () => {
        nodeRef.current.style.height = `${nodeRef.current.scrollHeight}px`;
    };

    const handleEntered = () => {
        nodeRef.current.style.height = null;
    };

    /* -- Collapsing -- */
    const handleExit = () => {
        nodeRef.current.style.height = `${nodeRef.current.offsetHeight}px`;
        // 设置style高度！！！！
        // nodeRef.current.offsetHeight; // eslint-disable-line no-unused-expressions
    };

    const handleExiting = () => {
        nodeRef.current.style.height = '0px';
    };

    return (
        <Transition
            {...rest}
            timeout={500}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
        >
            {status => (
                <div
                    ref={nodeRef}
                    className={classNames(styles.collapseDefaultFramework, {
                        [styles.collapseInFramework]: ['entering', 'entered', 'exiting'].includes(status),
                        [styles.collapsingFramework]: ['entering', 'exiting'].includes(status),
                        [className]: true
                    })}
                >
                    {rest.children}
                </div>
            )}
        </Transition>
    );
}

Collapse.defaultProps = defaultProps;

export default React.memo(Collapse);
