import { React, PropTypes } from 'framework/util';
import { Form, Input, Button, Divider } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    CheckSquareOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styles from './scss/index.scss';

interface FuncViewProps {
    getCode: () => Promise<any>;
}


const FuncView: React.FC<FuncViewProps> = function (props: FuncViewProps) {

    const [codeImage, setCode] = React.useState();
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const setImageCode = () => {

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
    const { getCode } = props;
    React.useEffect(() => {
        getCode().then(res => {
            console.log(res);
        });
    });
    return (
        <div className={styles.login}>
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
                            maxLength={11}
                            allowClear
                            prefix={<LockOutlined />}
                            placeholder="密码"
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
                            登录
                        </Button>
                    </Form.Item>
                    <div className="registry">
                        <span>还没账号</span> <NavLink to="/registry">注册</NavLink>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FuncView;
