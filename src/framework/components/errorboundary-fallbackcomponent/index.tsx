/**
 * 功能：组件发生错误时显示界面
 * 作者：安超
 * 日期： 2019/7/15
 */

import React from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import Lang from './lang';
import styles from './scss/index.scss';

type ErrorBoundaryFallbackProps = {
    componentStack: string;
    error: any;
};

const ErrorBoundaryFallbackComponent: React.FC<ErrorBoundaryFallbackProps> = function ({
    componentStack = Lang.componentStack(),
    error = new Error(Lang.crashReason())
}) {
    const showError = function () {
        Modal.error({
            title: Lang.modalTitle(),
            content: (
                <>
                    ${Lang.error()}:${error.toString()};
                    <br />
                    ${Lang.reason()}:${componentStack}
                </>
            ),
            width: '80%'
        });
    };

    return (
        <div className={styles.errorboundaryCommon}>
            <div className={styles.errorPic} role="presentation" onClick={showError} />
            <div className={classNames(styles.errorText, 'text-center')}>{Lang.crashMsg()}</div>
        </div>
    );
};

export default ErrorBoundaryFallbackComponent;
