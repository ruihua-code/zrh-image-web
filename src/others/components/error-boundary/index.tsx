/**
 * 功能: 崩溃测试
 * 作者: 安超
 * 日期: 2019-07-17 10:54
 */

import { React, withErrorBoundary } from 'framework/util';

type ErrorProps = {};

const Error: React.FC<ErrorProps> = function () {
    const [count, setCount] = React.useState(0);

    const increase = () => {
        setCount(preCount => {
            return preCount + 1;
        });
    };

    if (count === 3) {
        return (
            <div>
                {[{ id: 1 }].map(item => (
                    <span key={`${item.id}`}>{item}</span>
                ))}
            </div>
        );
    }

    return (
        <div>
            {count}
            <br />
            <button type="button" onClick={increase}>
                增加
            </button>
        </div>
    );
};

export default withErrorBoundary(Error);
