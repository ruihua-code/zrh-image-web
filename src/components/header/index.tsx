/**
 * 功能：顶组件
 * 作者：安超
 * 日期： 2016/3/26
 */

import { React, NavLink, withRouter, classNames } from 'framework/util';
import { Row, Col } from 'antd';
import { ReadOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import config from 'conf';
import dialog from 'dialog';
import UserDropDown from '@mlamp/user-info-dropdown';
import Lang from './lang';
import styles from './scss/index.scss';

const {
    url: {
        login,
        app: { helper }
    }
} = config;

const { systemName } = window.projectConf;

type HeaderProps = {
    username: string;
    logout: () => Promise<any>;
    history: any;
};

const Header: React.FC<HeaderProps> = function ({ username, logout, history }) {
    const logoutFn = () => {
        logout().then(res => {
            if (res.statusCode === 200) {
                history.replace(config.url.login.path);
            } else {
                dialog.alert({
                    infoType: 'error',
                    content: <div>{res.message}</div>
                });
            }
        });
    };

    const showHelperDoc = () => {
        history.push(helper.path);
    };

    const handleUserMenuClick = ({ key }) => {
        switch (key) {
            case 'logout':
                logoutFn();
                break;
            case 'helper':
                showHelperDoc();
                break;
            default:
        }
    };

    return (
        <div className={classNames(styles.header, 'clearfix')}>
            <Row>
                <Col flex="300px">
                    <NavLink replace to={login.path} className={styles.logo}>
                        <div className={styles.logoBox}>
                            <span role="presentation" className={styles.logo} />
                            <span className={styles.title}>{systemName}</span>
                        </div>
                    </NavLink>
                </Col>
                <Col flex="auto">
                    {/* <Space size={50} className="navigation">
                        <NavLink
                            replace
                            to={todos.path}
                            activeClassName="active"
                        >{Lang.todoNav}
                        </NavLink>
                        <NavLink
                            replace
                            to={others.path}
                            activeClassName="active"
                        >{Lang.otherNav}
                        </NavLink>
                    </Space>
                     */}
                </Col>
                <Col flex="100px">
                    <UserDropDown
                        userInfo={[
                            {
                                key: 'user',
                                label: username,
                                icon: <UserOutlined />,
                                disabled: true,
                                isDivider: false
                            },
                            {
                                key: 'helper',
                                label: Lang.helper,
                                icon: <ReadOutlined />,
                                disabled: false,
                                isDivider: false
                            },
                            {
                                key: 'logout',
                                label: Lang.logout,
                                icon: <LogoutOutlined />
                            }
                        ]}
                        handleClick={handleUserMenuClick}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default React.memo(withRouter(Header));
