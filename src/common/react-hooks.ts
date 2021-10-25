/**
 * 功能：React hooks帮助类
 * 作者：安超
 * 日期：2020/7/1
 */
import * as React from 'react';

// componentDidMount
export function ComDidMount(useEffectFn, effectCallback) {
    return useEffectFn(effectCallback, []);
}

// componentDidUpdate
export function ComDidUpdate(useEffectFn, effectCallback, effectArray = []) {
    return useEffectFn(effectCallback, effectArray);
}

// componentWillUnmount
export function ComWillUnmount(useEffectFn, effectCallback) {
    return useEffectFn(() => () => effectCallback(), []);
}

export function useInterval(fun, intervalTime = 1000) {
    const myRef = React.useRef(null);
    React.useEffect(() => {
        myRef.current = fun;
    }, [fun]);

    React.useEffect(() => {
        myRef.current();
        const id = setInterval(() => {
            myRef.current();
        }, intervalTime);
        return () => clearInterval(id);
    }, []);
}
