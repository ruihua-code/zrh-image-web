import { React, PureComponent, classNames } from 'framework/util';
import { Tooltip, Input } from 'antd';
import {
    CopyOutlined,
    DeleteOutlined,
    RedoOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined
} from '@ant-design/icons';
import ZoomSlider from '../tree-cy-operation-zoom-slider';
import styles from './scss/index.scss';

const { Search } = Input;

type ViewProps = {};
type ViewState = {
    isFullScreen: boolean;
};

class View extends PureComponent<ViewProps, ViewState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isFullScreen: false
        };
    }

    componentDidMount() { }

    render() {
        const { isFullScreen } = this.state;

        return (
            <div className={styles.graphDefineGraphContentHeader}>
                <div className={styles.topBox}>
                    <div className={classNames(styles.titleBox, 'pull-left')}>
                        <Tooltip title="复制">
                            <CopyOutlined className={styles.iconBtn} />
                        </Tooltip>
                        <Tooltip title="删除">
                            <DeleteOutlined className={styles.iconBtn} />
                        </Tooltip>
                        <Search placeholder="请输入搜索关键字" className={styles.topSearch} enterButton />
                    </div>
                    <div className="operation-box pull-right">
                        <div className="pull-left">
                            <Tooltip title="刷新">
                                <RedoOutlined className={styles.iconBtn} />
                            </Tooltip>
                            {isFullScreen && (
                                <Tooltip title={isFullScreen ? '还原' : '全屏'}>
                                    <FullscreenExitOutlined className={styles.iconBtn} />
                                </Tooltip>
                            )}
                            {!isFullScreen && (
                                <Tooltip title={isFullScreen ? '还原' : '全屏'}>
                                    <FullscreenOutlined className={styles.iconBtn} />
                                </Tooltip>
                            )}
                            <ZoomSlider graphZoom={{ percent: 1 }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
