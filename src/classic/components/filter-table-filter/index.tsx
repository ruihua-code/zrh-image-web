/**
 * 功能: 筛选框-头部筛选
 * 作者: yuchen
 * 日期: 2020-11-08
 */
import { React, classNames, dayjs } from 'framework/util';
import { Form, Select, Button, DatePicker, Row, Col } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import styles from './scss/index.scss';

const { Option } = Select;

const datePickerLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const formMap = {
    datasourceId: '数据源',
    stdBy: '对标用户',
    approvalUser: '审核用户',
    stdStatus: '对标状态',
    approvalStatus: '审核状态',
    stdDate: '对标时间',
    approvalDate: '审核时间'
};

const datatimeFormatStr = 'YYYY-MM-DD HH:mm:ss';

type SearchHeaderProps = {
    filter: any;
    onGetData: (val) => void;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({ onGetData }) => {
    const [form] = Form.useForm();
    const [conditions, setConditions] = React.useState([]);
    const [hideMenu, setMenuStatus] = React.useState(true);

    const expendSearch = () => {
        setMenuStatus(false);
    };

    const packupSearch = () => {
        setMenuStatus(true);
    };

    const handleSubmit = () => {
        const values = form.getFieldsValue();
        const conditionsNew = [];
        Object.keys(values).forEach(key => {
            if (values[key] !== '' && values[key] !== undefined) {
                conditionsNew.push(formMap[key]);
            }

            if (key === 'stdDate') {
                values.stdDate = dayjs(values.stdDate).format(datatimeFormatStr);
            }

            if (key === 'approvalDate') {
                values.approvalDate = dayjs(values.approvalDate).format(datatimeFormatStr);
            }
        });
        setConditions(conditionsNew);
        onGetData({
            filter: values,
            page: 1
        });
    };

    const handleReset = () => {
        form.resetFields();
        const values = form.getFieldsValue();
        Object.keys(values).forEach(key => {
            values[key] = '';
        });
        setConditions([]);
        onGetData({
            filter: values,
            page: 1
        });
    };

    return (
        <div className={styles.searchHeaderBox}>
            <div className={classNames(styles.searchContainer, { fold: hideMenu })}>
                {/* 收起时状态 */}
                <div className={styles.searchHeader}>
                    <div className={classNames(styles.searchParams, 'pull-left')}>
                        <span>已选条件: </span>
                        {conditions.length
                            ? conditions.map(item => (
                                <div className="ant-tag" key={item}>
                                    {item}
                                </div>
                            ))
                            : ''}
                    </div>
                    <div className={classNames(styles.spanOperation, 'pull-right')}>
                        <div role="presentation" className="" onClick={expendSearch}>
                            <span className="mr-10">高级检索</span>
                            <span className={classNames(styles.searchTagCount, 'mr-10')}>{conditions.length}</span>
                        </div>
                    </div>
                </div>
                {/* 展开时状态 */}
                <div className={styles.searchContent}>
                    <Form form={form} name="control-hooks">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="datasourceId" label="数据源: " {...formItemLayout}>
                                    <Select className={styles.widthNormal} allowClear placeholder="请选择数据源">
                                        <Option value="0">wecity_ml</Option>
                                        <Option value="1">smart_city_test</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="stdBy" label="对标用户: " {...formItemLayout}>
                                    <Select className={styles.widthNormal} allowClear placeholder="请选择对标用户">
                                        <Option value="0">std</Option>
                                        <Option value="1">qd</Option>
                                        <Option value="3">yyt</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="approvalUser" label="审核用户: " {...formItemLayout}>
                                    <Select className={styles.widthNormal} allowClear placeholder="请选择审核用户">
                                        <Option value="0">std</Option>
                                        <Option value="1">qd</Option>
                                        <Option value="3">yyt</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="stdStatus" label="对标状态: " {...formItemLayout}>
                                    <Select className={styles.widthNormal} allowClear placeholder="请选择对标状态">
                                        <Option value="0">待对标</Option>
                                        <Option value="1">对标中</Option>
                                        <Option value="2">待对标</Option>
                                        <Option value="3">重新对标</Option>
                                        <Option value="4">已对标</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="approvalStatus" label="审核状态: " {...formItemLayout}>
                                    <Select className={styles.widthNormal} allowClear placeholder="请选择对标状态">
                                        <Option value="0">草稿</Option>
                                        <Option value="1">待审核</Option>
                                        <Option value="2">驳回</Option>
                                        <Option value="3">撤回</Option>
                                        <Option value="4">通过</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="stdDate" label="对标时间: " {...datePickerLayout}>
                                    <DatePicker allowClear format={datatimeFormatStr} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="approvalDate" label="审核时间: " {...datePickerLayout}>
                                    <DatePicker allowClear format={datatimeFormatStr} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className={styles.searchBtnGroup}>
                            <Button type="primary" onClick={handleSubmit}>
                                检 索
                            </Button>
                            <Button onClick={handleReset}>重 置</Button>
                            <div
                                role="presentation"
                                className={classNames(styles.searchUp, 'pull-right')}
                                onClick={packupSearch}
                            >
                                <span className="mr-10">收起</span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
