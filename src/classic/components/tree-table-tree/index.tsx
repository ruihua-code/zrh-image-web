import { React, noop } from 'framework/util';
import { Button, Tooltip, Tree } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import styles from './scss/index.scss';

const treeData = [
    {
        key: '0-0',
        title: {
            titleText: '人口基础',
            menuType: 'dropDown',
            menuList: [
                <span key="edit" role="presentation" onClick={null}>
                    <EditOutlined className="btn-icon" />
                    编辑
                </span>,
                <span key="delete" className="oper-btn" role="presentation" onClick={null}>
                    <DeleteOutlined className="btn-icon" />
                    删除
                </span>
            ],
            count: 11
        },
        children: [
            {
                title: {
                    titleText: '人口基础子目录',
                    menuType: 'dropDown',
                    menuList: [
                        <span key="edit" role="presentation" onClick={null}>
                            <EditOutlined className="btn-icon" />
                            编辑
                        </span>,
                        <span key="delete" className="oper-btn" role="presentation" onClick={null}>
                            <DeleteOutlined className="btn-icon" />
                            删除
                        </span>
                    ],
                    count: 11
                },
                key: '0-1'
            }
        ]
    },
    {
        key: '1-0',
        title: {
            titleText: '法人基础',
            menuType: 'dropDown',
            menuList: [
                <span key="edit" role="presentation" onClick={null}>
                    <EditOutlined className="btn-icon" />
                    编辑
                </span>,
                <span key="delete" className="oper-btn" role="presentation" onClick={null}>
                    <DeleteOutlined className="btn-icon" />
                    删除
                </span>
            ],
            count: 11
        }
    },
    {
        key: '2-0',
        title: {
            titleText: '长沙数字城市',
            menuType: 'dropDown',
            menuList: [
                <span key="edit" role="presentation" onClick={null}>
                    <EditOutlined className="btn-icon" />
                    编辑
                </span>,
                <span key="delete" className="oper-btn" role="presentation" onClick={null}>
                    <DeleteOutlined className="btn-icon" />
                    删除
                </span>
            ],
            count: 11
        }
    }
];

type ViewProps = {
    title?: string;
};

const defaultProps = {
    title: ''
};

const View: React.FC<ViewProps> = function (props: ViewProps & typeof defaultProps) {
    const { title } = props;

    function dig(path = '0', level = 3) {
        const list = [];
        for (let i = 0; i < 10; i += 1) {
            const key = `${path}-${i}`;
            let treeNode: { title: string, key: string, children?: any[] } = {
                title: key,
                key
            };

            if (level > 0) {
                const children = dig(key, level - 1);
                treeNode = {
                    ...treeNode,
                    children
                };
            }

            list.push(treeNode);
        }
        return list;
    }

    const treeData = dig();

    return (
        <div className={styles.demoTreePanelClassic}>
            <div className={styles.headerBox}>
                <span>{title}</span>
                <Tooltip title="新增目录">
                    <Button type="link" icon={<FileAddOutlined size={16} />} />
                </Tooltip>
            </div>
            <div className={styles.treeBox}>
                <Tree treeData={treeData} height={300} defaultExpandAll />
            </div>
        </div>
    );
};

View.defaultProps = defaultProps;

export default View;
