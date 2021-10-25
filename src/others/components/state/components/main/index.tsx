import { React, ReactDOM, Helper } from 'framework/util';
import parser from 'html-react-parser';
import Collapse from '../collapse';
import styles from './scss/index.scss';

type ValidatorProps = {};
type ValidatorState = {
    show: boolean;
};

const Validator: React.FC<ValidatorProps> = function () {
    const containerDiv = React.useRef();
    const [show, setShow] = React.useState(true);

    Helper.ComDidMount(React.useEffect, () => {
        const html =
            "<BR/><i class='highlight'>王</i><i class='highlight'>鹏</i>在给小朋友做推拿(html-react-parser)。<BR/>";
        ReactDOM.render(parser(`<h1>${html}</h1>`), containerDiv.current);
    });

    const onShowChange = show => {
        setShow(show);
    };

    const showAndHide = () => {
        setShow(pre => {
            return !pre;
        });
    };

    return (
        <div className={styles.validatormainOthers}>
            <button type="button" onClick={showAndHide}>
                显示隐藏
            </button>
            <Collapse show={show} onShowChange={onShowChange} />
            <div ref={containerDiv}>测试html-to-react</div>
        </div>
    );
};

export default Validator;
