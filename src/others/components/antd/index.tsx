/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React, PureComponent } from 'framework/util';
import dialog from 'dialog';
import { Row, Col, Button, Select, DatePicker, TimePicker, Space } from 'antd';
import EasyTableAntd from '@mlamp/easy-table-antd';
import dayjs, { Dayjs } from 'dayjs';
import Iconfont from '@/components/iconfont';
import styles from './scss/index.scss';
// import type { PanelMode } from 'rc-picker/lib/interface';

const { Option } = Select;
const { RangePicker } = DatePicker;

type AntdViewProps = {
    names: any[];
};

const AntdView: React.FC<AntdViewProps> = function ({ names }) {
    const monthFormat = 'YYYY/MM';
    const [value, setValue] = React.useState([dayjs('2021/01', monthFormat), dayjs('2021/12', monthFormat)]);
    const [mode, setMode] = React.useState(['month', 'month']);

    const okClick = () => {
        dialog.setFooter([
            <Button key="ok" type="primary" loading>
                ok
            </Button>
        ]);
    };

    const showModal = () => {
        dialog.open({
            title: 'hehe',
            content: <div>一些数据</div>,
            footer: [
                <Button key="ok" type="primary" onClick={okClick} loading={false}>
                    ok
                </Button>
            ]
        });
    };

    const deleteModal = () => {
        dialog.confirm({
            dialogType: 'delete',
            content: '确定要删除吗？',
            ok() {
                dialog.hide();
            }
        });
    };

    const expandedRowRender = (record: {
        name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
    }) => <div>{record.name}</div>;

    const antdTableRender = () => {
        const dataSource = names.map((item, index) => ({
            key: `${item.name}-${index}`,
            ...item
        }));

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: name => `${name}`
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address'
            }
        ];

        return (
            <div className="antd-table-others">
                <EasyTableAntd
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        pageNo: 1,
                        pageSize: 10,
                        total: 500
                    }}
                    scroll={{ y: false }}
                    expandable={{ expandedRowRender }}
                />
            </div>
        );
    };

    const handlePanelChange = (value: React.SetStateAction<dayjs.Dayjs[]>, mode: string[]) => {
        debugger;
        setValue(value);
        setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]);
    };

    const dateFormat = 'YYYY/MM/DD';

    return (
        <div className={styles.antdMainOthers}>
            <Space>
                <Button type="primary" onClick={showModal}>
                    弹窗
                </Button>
                <Button danger onClick={deleteModal}>
                    删除
                    <Iconfont type="icon-facebook" style={{ color: 'white' }} />
                </Button>
            </Space>
            <Row gutter={16}>
                <Col span={8}>{antdTableRender()}</Col>
                <Col span={8}>
                    <Select autoFocus className={styles.personNames}>
                        <Option value="lucy">lucy</Option>
                        <Option value="lili">lili</Option>
                        <Option value="xiaoming">xiaoming</Option>
                        <Option value="xuliang">xuliang</Option>
                    </Select>
                </Col>
                <Col span={8}>
                    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
                    <TimePicker onChange={v => console.log(v)} />
                    <RangePicker
                        placeholder={['开始月份', '结束月份']}
                        format="YYYY-MM"
                        // value={value}
                        // mode={mode}
                        onPanelChange={handlePanelChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AntdView;
