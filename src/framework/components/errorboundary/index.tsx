/**
 * 功能：错误边界
 * 作者：安超
 * 日期： 2019/7/15
 */

import React from 'react';
import ErrorBoundaryFallbackComponent from '../errorboundary-fallbackcomponent';

type ErrorBoundaryProps = {
    onError?: (error, info) => void;
    FallbackComponent?: any;
};
type ErrorBoundaryState = {
    error: any;
    info: any;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            error: null,
            info: null
        };
    }

    componentDidCatch(error, info) {
        const { onError } = this.props;
        if (typeof onError === 'function') {
            onError.call(this, error, info ? info.componentStack : '');
        }

        this.setState({
            error,
            info
        });
    }

    render() {
        const { children, FallbackComponent = ErrorBoundaryFallbackComponent } = this.props;
        const { error, info } = this.state;
        if (error !== null) {
            return <FallbackComponent componentStack={info ? info.componentStack : ''} error={error} />;
        }

        return children;
    }
}

export default ErrorBoundary;
