/**
 * 功能: 筛选框-头部筛选
 * 作者: yuchen
 * 日期: 2020-11-08
 */
import { React } from 'framework/util';
import { Input, Button } from 'antd';
import styles from './scss/index.scss';

const { Search } = Input;

type BarInterface = {
    keyword: string;
    onGetData: (val) => void;
    onChange: (val) => void;
};

const Bar: React.FC<BarInterface> = ({ keyword = '', onGetData, onChange }) => {
    return (
        <div className={styles.demoFilterTableOperationClassic}>
            <div>
                <Search
                    placeholder="请输入关键字"
                    enterButton
                    onSearch={() =>
                        onGetData({
                            keyword,
                            page: 1
                        })}
                    value={keyword}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
            <div>
                <Button type="primary">新建</Button>
            </div>
        </div>
    );
};

export default Bar;
