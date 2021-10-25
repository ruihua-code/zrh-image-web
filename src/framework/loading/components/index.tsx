import React from 'react';
import classNames from 'classnames';
import styles from './scss/index.scss';

interface LoadingProps {
    show?: boolean;
}

const defaultProps = {
    show: false
};

function Loading(props: LoadingProps & typeof defaultProps) {
    const { show = false } = props;

    return (
        <div className={classNames({
            hide: !show,
            [styles.loadingdiv]: true
        })}
        >
            <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            </div>
        </div>
    );
}

Loading.defaultProps = defaultProps;

export default React.memo(Loading);

