/**
 * 功能: 动画
 * 作者: 安超
 * 日期: 2020/6/17 16:42
 */

import { React } from 'framework/util';
import { Button, Row, Col, Card } from 'antd';
import Animate from 'framework/components/animate';
import styles from './scss/index.scss';

const { Fade, Collapse } = Animate;

const TransitionCom: React.FC = function () {
    const [collapse, setCollapse] = React.useState(false);
    const [show, setShow] = React.useState(false);

    return (
        <div className={styles.testFade}>
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={() => setCollapse(!collapse)}>
                        折叠切换
                    </Button>
                    <Collapse in={collapse} className="collapse-transition">
                        <Card title="Default size card">
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Collapse>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => setShow(!show)}>
                        淡隐淡出切换
                    </Button>
                    <Fade in={show} timeout={10} className={styles.testFontColor}>
                        <Card title="Default size card">
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Fade>
                </Col>
            </Row>
        </div>
    );
};

export default React.memo(TransitionCom);
