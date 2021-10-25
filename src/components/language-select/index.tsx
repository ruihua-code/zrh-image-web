/**
 * 功能：语言选择组件
 * 作者：安超
 * 日期：2020/6/30
 */
import { React, classNames, Helper } from 'framework/util';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './scss/index.scss';

type LanguageSelectProps = {
    options: any[];
    value: string;
    className: string;
};

function LanguageSelect({ options, value, className = '' }: LanguageSelectProps) {
    const getNameByKey = key => {
        const oLang = options.find(item => item.value === key);
        if (oLang) {
            return oLang;
        }

        return {
            name: ''
        };
    };

    const selectChange = ({ key }) => {
        Helper.setCookie('lang', key);
        window.location.reload();
    };

    const menu = () => (
        <Menu onClick={selectChange}>
            {options.map(item => (
                <Menu.Item key={item.value}>{item.name}</Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className={classNames({ [className]: true, [styles.main]: true })}>
            <Dropdown overlay={menu} trigger={['click']}>
                <Space size="small">
                    {getNameByKey(value).name}
                    <DownOutlined />
                </Space>
            </Dropdown>
        </div>
    );
}

export default React.memo(LanguageSelect);
