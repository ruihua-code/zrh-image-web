/**
 * 功能: 淡隐淡出
 * 作者: 安超
 * 日期: 2020/6/23 15:51
 */

import React from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import styles from './scss/index.scss';

type FadeProps = React.PropsWithChildren<{
    className: string;
    in: boolean;
    timeout?: number;
}>;

const defaultProps = {
    timeout: 500,
};

function Fade(props: FadeProps & typeof defaultProps) {
    const { className = '', ...rest } = props;
    return (
        <Transition {...rest} timeout={500}>
            {status => (
                <div
                    className={classNames(styles.fadeDefaultFramework, {
                        [styles.fadeInFramework]: ['entering', 'entered'].includes(status),
                        [className]: true
                    })}
                >
                    {rest.children}
                </div>
            )}
        </Transition>
    );
}

Fade.defaultProps = defaultProps;

export default React.memo(Fade);
