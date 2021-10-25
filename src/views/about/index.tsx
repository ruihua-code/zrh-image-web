import { React } from 'framework/util';
import { Row, Col } from 'antd';
import styles from './scss/index.scss';

interface FuncViewProps { }

const FuncView: React.FC<FuncViewProps> = function (props: FuncViewProps) {
    return (
        <Row className={styles['container']}>
            <Col className="col-item" span={12} />
            <Col className="col-item" span={12} />
        </Row>
    );
};

export default FuncView;
