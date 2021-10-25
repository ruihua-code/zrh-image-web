/**
 * 功能： 多语言
 * 作者：安超
 * 日期： 2018/3/19
 */

import { React } from 'framework/util';
import { Row, Col, Card } from 'antd';
import Lang from './lang';

type IntlProps = {};

const Intl: React.FC<IntlProps> = function () {
    return (
        <>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Card title="基本">{Lang.simple}</Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="变量多样式">
                        <div>{Lang.passwordvalid}</div>
                        <div>{Lang.photo.no}</div>
                        <div>{Lang.photo.one}</div>
                        <div>{Lang.photo.more}</div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="HTML">
                        <div>{Lang.tip}</div>
                        <div>{Lang.tipWithVar}</div>
                        <div>{Lang.tipWithVar2}</div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="日期">
                        <div>{Lang.saleStart}</div>
                        <div>{Lang.saleEnd}</div>
                        <div>{Lang.coupon}</div>
                        <div>{Lang.time}</div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Card title="货币">
                        <div>{Lang.salePrice}</div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="未在组件内部">
                        <div>{Lang.getMessage()}</div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default React.memo(Intl);
