import { React, PureComponent } from 'framework/util';
import { Button } from 'antd';
import EasyTableAntd from '@mlamp/easy-table-antd';
import Operation from '../filter-table-operation';
import TreePanel from '../tree-table-tree';
import styles from './scss/index.scss';

type ViewProps = {
    getResourceListClassic: (val) => Promise<any>;
};
type ViewState = {
    page: number;
    pageSize: number;
    keyword: string;
    dataSource: any[];
    total: number;
    dir: any[];
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
            dir: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = (paramsObj = {}) => {
        const { getResourceListClassic } = this.props;
        const { page, pageSize, keyword, dir } = this.state;

        const params: any = {
            page,
            pageSize,
            keyword,
            dir,
            ...paramsObj
        };
        delete params.filter;

        Object.keys(params).forEach(key => {
            if (params[key] === '') {
                delete params[key];
            }
        });

        getResourceListClassic({ params }).then(res => {
            const { statusCode, data } = res;
            if (statusCode === 200) {
                const { data: list = [], total, page: pageNew, pageSize: pageSizeNew } = data || {};
                this.setState({
                    dataSource: list,
                    total,
                    page: pageNew,
                    pageSize: pageSizeNew,
                    dir: params.dir
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
        const { keyword, dataSource, total, page: pageNo, pageSize } = this.state;

        const columns = [
            {
                title: '内部标识符',
                dataIndex: 'elementId',
                key: 'elementId'
            },
            {
                title: '标识符',
                dataIndex: 'elementEn',
                key: 'elementEn'
            },
            {
                title: '中文名',
                dataIndex: 'elementCn',
                key: 'elementCn'
            },
            {
                title: '同义名',
                dataIndex: 'synonym',
                key: 'synonym'
            },
            {
                title: '操作',
                key: 'operation',
                width: 130,
                render: () => (
                    <div className={styles.operaBtns}>
                        <Button className={styles.operaBtns} type="link">
                            修改
                        </Button>
                        <Button className={styles.operaBtns} type="link" role="presentation">
                            删除
                        </Button>
                    </div>
                )
            }
        ];

        return (
            <div className={styles.demoTreeTableClassic}>
                <div className={styles.treeTableContent}>
                    <div className={styles.treeTableLeft}>
                        <TreePanel title="目录" />
                    </div>
                    <div className={styles.treeTableRight}>
                        <Operation keyword={keyword} onChange={this.handleChangeKeyword} onGetData={this.getData} />
                        <div className={styles.treeTableRightTable}>
                            <EasyTableAntd
                                dataSource={dataSource}
                                columns={columns}
                                size="small"
                                pagination={{
                                    pageNo,
                                    pageSize,
                                    total
                                }}
                                onChange={this.handleTableChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
