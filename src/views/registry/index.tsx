import { React } from 'framework/util';
import { Form, Input, Button, Divider } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    CheckSquareOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styles from './scss/index.scss';

interface FuncViewProps { }

const FuncView: React.FC<FuncViewProps> = function (props: FuncViewProps) {
    const [codeImage, setCode] = React.useState(null);
    const [uuid, setUuid] = React.useState(null);
    const onFinish = values => {
        console.log('Success:', values);
        // LoginApi.login({
        //     code: values.code,
        //     phone: values.phone,
        //     password: values.password,
        //     uuid,
        // });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const setImageCode = () => {
        // LoginApi.getCode().then(res => {
        //     setCode(`data:image/gif;base64,${res.img}`);
        //     setUuid(res.uuid);
        // });
    };
    const codeImageHtml = (
        <img
            role="presentation"
            onClick={() => setImageCode()}
            className="img-code"
            src={codeImage}
            alt="验证码"
        />
    );
    return (
        <div className={styles.registry}>
            <div className="bg" />
            <div className="form-box">
                <h2 className="title">
                    <Divider>小明跑腿 &bull; 后台管理系统</Divider>
                </h2>

                <Form
                    className="form"
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input
                            maxLength={11}
                            allowClear
                            prefix={<UserOutlined />}
                            placeholder="账号"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            maxLength={20}
                            allowClear
                            prefix={<LockOutlined />}
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="passwordRepeat"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            maxLength={20}
                            allowClear
                            prefix={<LockOutlined />}
                            placeholder="确认密码"
                        />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Input
                            maxLength={4}
                            allowClear
                            prefix={<CheckSquareOutlined />}
                            addonAfter={codeImageHtml}
                            placeholder="验证码"
                        />
                    </Form.Item>

                    <Form.Item className="btn-login">
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                    <div className="registry">
                        <span>已有账号去</span> <NavLink to="/">登录</NavLink>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FuncView;
