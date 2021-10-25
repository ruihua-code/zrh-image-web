/**
 * 功能：受限组件入口
 * 作者：安超
 * 日期： 2018/3/19
 */
import { lazyload } from 'framework';
import { React, PureComponent, Route, Redirect, Switch } from 'framework/util';
import config from 'conf';
import { Layout } from 'antd';
import {
    CalculatorOutlined,
    ConsoleSqlOutlined,
    CodeOutlined,
    FontColorsOutlined,
    AntDesignOutlined,
    AlibabaOutlined,
    DingdingOutlined,
    WeiboCircleOutlined,
    AreaChartOutlined,
    RadarChartOutlined,
    ZhihuOutlined
} from '@ant-design/icons';
import { OutFrame } from '@mlamp/darwin-lampstand';
import Header from '../header';
import styles from './scss/index.scss';

const {
    url: {
        app: {
            helper,
            classic,
            filterTable,
            treeTable,
            treeCy,
            stepPanel,
            todos,
            others,
            intl,
            antd,
            drag,
            map,
            transition,
            chart,
            state,
            error
        }
    }
} = config;

type AppProps = {
    match: Record<string, any>;
    getUserInfo: () => Promise<any>;
    logout: () => void;
    username: string;
};

type AppStates = {
    loadedUserInfo: boolean | Record<string, any>;
};

class App extends PureComponent<AppProps, AppStates> {
    menuData: DataRow[];

    constructor(props: AppProps) {
        super(props);
        this.state = {
            loadedUserInfo: false
        };

        this.menuData = [
            {
                title: '开发示例',
                id: 1,
                url: todos.path,
                icon: <CalculatorOutlined />
            },
            {
                title: '典型界面',
                id: 2,
                url: classic.path,
                icon: <ConsoleSqlOutlined />,
                children: [
                    {
                        title: '上筛选下表格布局',
                        id: '2-1',
                        url: filterTable.path
                    },
                    {
                        title: '左树右表布局',
                        id: '2-2',
                        url: treeTable.path
                    },
                    {
                        title: '左树右图标布局',
                        id: '2-3',
                        url: treeCy.path
                    },
                    {
                        title: '步骤面板布局',
                        id: '2-4',
                        url: stepPanel.path
                    }
                ]
            },
            {
                title: '多啦A梦',
                id: 3,
                url: others.path,
                icon: <CodeOutlined />,
                children: [
                    {
                        title: '多语言',
                        id: 4,
                        url: intl.path,
                        icon: <FontColorsOutlined />
                    },
                    {
                        title: 'Antd',
                        id: 5,
                        url: antd.path,
                        icon: <AntDesignOutlined />
                    },
                    {
                        title: '拖拽',
                        id: 6,
                        url: drag.path,
                        icon: <AlibabaOutlined />
                    },
                    {
                        title: '地图',
                        id: 7,
                        url: map.path,
                        icon: <RadarChartOutlined />
                    },
                    {
                        title: '动画',
                        id: 8,
                        url: transition.path,
                        icon: <WeiboCircleOutlined />
                    },
                    {
                        title: '图表',
                        id: 9,
                        url: chart.path,
                        icon: <AreaChartOutlined />
                    },
                    {
                        title: '崩溃',
                        id: 10,
                        url: error.path,
                        icon: <ZhihuOutlined />
                    },
                    {
                        title: 'state',
                        id: 11,
                        url: state.path,
                        icon: <DingdingOutlined />
                    }
                ]
            }
        ];
    }

    componentDidMount() {
        const { getUserInfo } = this.props;
        getUserInfo().then(() => {
            this.setState({
                loadedUserInfo: true
            });
        });
    }

    render() {
        const {
            match: { url },
            username,
            logout
        } = this.props;
        const { loadedUserInfo } = this.state;

        if (loadedUserInfo) {
            if (username.length === 0) {
                return <Redirect to={config.url.permission.path} />;
            }

            return (
                <Layout>
                    <OutFrame
                        useFull
                        authMenu={[]}
                        fullMenu={this.menuData}
                        menuKey="id"
                        username="guest"
                        logout={logout}
                        appList={[
                            {
                                icon: <span className="fa fa-weixin" />,
                                label: '微信社区',
                                href: 'https://juejin.cn',
                                appCode: '0001',
                                isDefault: true
                            },
                            {
                                icon: <span className="fa fa-linux" />,
                                label: '翎智社区',
                                href: 'https://fe-org.mlamp.cn',
                                appCode: '0002',
                                isDefault: false
                            }
                        ]}
                        routers={[
                            {
                                path: classic.path,
                                component: (
                                    <Route
                                        path={classic.path}
                                        component={lazyload(import('@/classic/components/main'))}
                                    />
                                ),
                            },
                            {
                                path: todos.path,
                                component: (
                                    <Route path={todos.path} component={lazyload(import('@/todos/components/main'))} />
                                ),
                            },
                            {
                                path: others.path,
                                component: (
                                    <Route
                                        path={others.path}
                                        component={lazyload(import('@/others/components/main'))}
                                    />
                                ),
                            },
                            {
                                path: helper.path,
                                component: (
                                    <Route path={helper.path} component={lazyload(import('@/components/helper'))} />
                                ),
                            },
                        ]}
                    />
                </Layout>
            );
        }
        return null;
    }
}

export default App;
