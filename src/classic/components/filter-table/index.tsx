import { React, PureComponent } from 'framework/util';
import EasyTableAntd from '@mlamp/easy-table-antd';
import { Button, Tag } from 'antd';
import Filter from '../filter-table-filter';
import Operation from '../filter-table-operation';
import styles from './scss/index.scss';

const stdStatusMap = {
    doing: { text: '对标中', className: 'ant-doing' },
    waiting: { text: '待对标', className: 'ant-waiting' },
    uncertain: { text: '待确认', className: 'ant-uncertain' },
    redo: { text: '重新对标', className: 'ant-redo' },
    done: { text: '已对标', className: 'ant-done' }
};

type ViewProps = {
    getTableDataClassic: (val) => Promise<any>;
};
type ViewState = {
    page: number;
    pageSize: number;
    keyword: string;
    filter: any;
    dataSource: any[];
    total: number;
};

class View extends PureComponent<ViewProps, ViewState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyword: '',
            dataSource: [],
            total: 10,
            page: 1,
            pageSize: 20,
            filter: {}
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = (paramsObj: any = {}) => {
        const { getTableDataClassic } = this.props;
        const { page, pageSize, keyword, filter: filterOld } = this.state;
        const filter = {
            ...filterOld,
            ...paramsObj.filter
        };

        const params = {
            page,
            pageSize,
            keyword,
            ...filter,
            ...paramsObj
        };
        delete params.filter;

        Object.keys(params).forEach(key => {
            if (params[key] === '') {
                delete params[key];
            }
        });

        getTableDataClassic({ params }).then(res => {
            const { statusCode, data } = res;
            if (statusCode === 200) {
                const { data: list = [], total, page: pageNew, pageSize: pageSizeNew } = data || {};
                list.forEach(item => {
                    const itemNew = item;
                    itemNew.datasourceName = item?.rawTable?.datasourceName;
                    itemNew.tableName = item?.rawTable?.tableName;
                    itemNew.tableComment = item?.rawTable?.tableComment;
                    itemNew.tableType = item?.rawTable?.tableType === 0 ? '数据表' : '码表';
                });
                this.setState({
                    dataSource: list,
                    total,
                    page: pageNew,
                    pageSize: pageSizeNew,
                    filter
                });
            }
        });
    };

    handleChangeKeyword = keyword => {
        this.setState({ keyword });
    };

    handleTableChange = pagination => {
        const { current, pageSize: size } = pagination;
        this.getData({
            pageSize: size,
            pageNum: current
        });
    };

    render() {
        const { dataSource, total, page: pageNo, pageSize, keyword, filter } = this.state;

        const columns = [
            {
                title: '数据源',
                width: 200,
                ellipsis: true,
                dataIndex: 'datasourceName',
                key: 'datasourceName'
            },
            {
                title: '原始表名',
                width: 200,
                ellipsis: true,
                dataIndex: 'tableName',
                key: 'tableName'
            },
            {
                title: '原始表注释',
                width: 200,
                dataIndex: 'tableComment',
                key: 'tableComment'
            },
            {
                title: '表类型',
                width: 100,
                dataIndex: 'tableType',
                key: 'tableType'
            },
            {
                title: '对标状态',
                width: 200,
                dataIndex: 'stdStatus',
                key: 'stdStatus',
                render: (text, record) => {
                    let stdStatus = '';
                    if (record?.rawTable?.tableType === 0) {
                        stdStatus = record?.stdTable?.stdStatus ?? '';
                    }
                    if (stdStatus && stdStatus !== '-') {
                        return <Tag>{stdStatusMap[stdStatus].text}</Tag>;
                    }
                    return '-';
                }
            },
            {
                title: '创建日期',
                width: 200,
                dataIndex: 'createDate',
                key: 'createDate'
            },
            {
                title: '计划完成日期',
                width: 200,
                dataIndex: 'planDate',
                key: 'planDate'
            },
            {
                title: '创建人',
                width: 100,
                dataIndex: 'stdUserName',
                key: 'stdUserName'
            },
            {
                title: '更新人员',
                width: 100,
                dataIndex: 'updateBy',
                key: 'updateBy'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: 210,
                key: 'operation',
                fixed: 'right',
                render: (text, record) => {
                    const recordCopy = { ...record };
                    const { tableType } = recordCopy.rawTable;

                    return (
                        <div className="oper-btns">
                            <Button type="link">表对标</Button>
                            <Button type="link" disabled>
                                {tableType === 1 ? '码值对标' : '对标字段'}
                            </Button>
                        </div>
                    );
                }
            }
        ];

        const tableProps = {
            columns,
            // onRow: () => {
            //     return {
            //         onClick: noop, // 点击行
            //         onDoubleClick: noop,
            //         onContextMenu: noop,
            //         onMouseEnter: noop, // 鼠标移入行
            //         onMouseLeave: noop,
            //     }
            // },
            rowSelection: {}
        };

        return (
            <div className={styles.demoFilterTableClassic}>
                <div className={styles.filterTableContent}>
                    <Filter filter={filter} onGetData={this.getData} />
                    <Operation keyword={keyword} onChange={this.handleChangeKeyword} onGetData={this.getData} />
                    <div className={styles.filterTableTable}>
                        <EasyTableAntd
                            {...tableProps}
                            dataSource={dataSource}
                            size="small"
                            pagination={{
                                pageNo,
                                pageSize,
                                total
                            }}
                            scroll={{ x: '100%' }}
                            onChange={this.handleTableChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
