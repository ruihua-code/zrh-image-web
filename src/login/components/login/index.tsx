/**
 * 功能：登录
 * 作者：安超
 * 日期： 2018/4/24
 */
import { React, Helper, noop } from 'framework/util';
import config from 'conf';
import particlesJS from 'particles';
import { Button, Form, Input, Radio, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import tree from './media/tree.mp4';
import Lang from './lang';
import { PostLoginRequest } from '../../types';
import styles from './scss/index.scss';

const { constant, url } = config;

type LoginProps = {
    history: Record<string, any>;
    login: (state?) => Promise<any>;
    projectInit: () => void;
    userType: number;
};

const Login: React.FC<LoginProps> = function (props) {
    const username: React.LegacyRef<Input> = React.useRef();

    Helper.ComDidMount(React.useEffect, () => {
        username.current.focus();
        particlesJS('particles-js', constant.particles);

        const { projectInit } = props;
        projectInit();
    });

    const gotoUrl = appUrl => {
        const { history } = props;
        history.replace(appUrl);
    };

    const login = (params: PostLoginRequest) => {
        const { login } = props;

        // 登录检验
        login({ data: params }).then(res => {
            if (res.statusCode === 200) {
                gotoUrl(url.app.root.path);
            }
        });
    };

    const handleSubmit = values => {
        login(values);
    };

    const onContextMenu = e => {
        e.preventDefault();
    };

    const { userType } = props;
    const RadioGroup = Radio.Group;

    return (
        <div className={styles.loginLogin}>
            <div id="particles-js" />
            <Row>
                <Col className="left">
                    <div className="tree-bg">
                        <video
                            onContextMenu={onContextMenu}
                            style={{ opacity: 1 }}
                            preload="preload"
                            loop
                            autoPlay
                            muted
                        >
                            <track kind="captions" />
                            <source src={tree} type="video/mp4" />
                            本浏览器不支持视频播放
                        </video>
                    </div>
                    <div className="logo-img-left">
                        <img src={`/${THEME}/images/logo.png`} alt="明略科技" />
                    </div>
                </Col>
                <Col className="right">
                    <div className="form-container">
                        <Form
                            onFinish={handleSubmit}
                            className="login-form"
                            initialValues={{
                                userType
                            }}
                        >
                            <Form.Item>
                                <div className="project-title">前端团队初始化工程</div>
                            </Form.Item>
                            <Form.Item
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!'
                                    }
                                ]}
                            >
                                <Input
                                    className="login-form-input"
                                    placeholder="请输入用户名"
                                    ref={username}
                                    prefix={<UserOutlined style={{ fontSize: 20 }} />}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: Lang.passwordErrorMsg
                                    }
                                ]}
                            >
                                <Input
                                    className="login-form-input"
                                    prefix={<LockOutlined style={{ fontSize: 20 }} />}
                                    type="password"
                                    placeholder={Lang.passwordPlaceholder}
                                />
                            </Form.Item>
                            <Form.Item
                                name="userType"
                                rules={[{ required: true, message: Lang.roleErrorMsg }]}
                                style={{ margin: '-10px 0 10px 0' }}
                            >
                                <RadioGroup onChange={noop}>
                                    <Radio value={0}>{Lang.normal}</Radio>
                                    <Radio value={1}>{Lang.admin}</Radio>
                                </RadioGroup>
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit" className="login-form-button">
                                    {Lang.login}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="company-info">
                        <p className="company-info-tite">© 2020 明略科技 版权所有</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
