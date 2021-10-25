/**
 * 功能：收缩组件
 * 作者：安超
 * 日期：2018/8/8
 */
import { React, noop, PureComponent, classNames } from 'framework/util';

type CollapseProps = {
    show: boolean;
    onShowChange: (val) => void;
};

const Collapse: React.FC<CollapseProps> = function ({ show, onShowChange }) {
    const [isShow, setIsShow] = React.useState(show);

    const showChange = () => {
        setIsShow(prevState => {
            const newShow = !prevState;
            onShowChange(newShow);
            return newShow;
        });
    };

    return (
        <div style={{ border: '1px solid red', width: 300, height: 300 }} key={isShow.toString()}>
            <div className={classNames({ hide: !show })} style={{ border: '1px solid red', width: 100, height: 100 }}>
                内容
            </div>
            <button type="button" onClick={showChange}>
                显示隐藏
            </button>
        </div>
    );
};

export default Collapse;
