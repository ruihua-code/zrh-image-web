/**
 * 功能: 设计中心 - 图谱搜索缩放滑块
 * 作者: 郝海亮
 * 日期: 2020-03-08
 */
import { React, PropTypes, noop } from 'framework/util';
import { Slider } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './scss/index.scss';

const minZoom = 0.8;
const maxZoom = 1.2;

type ZoomSliderProps = {
    graphZoom: any;
    setGraphZoom?: (val) => void;
};

const ZoomSlider: React.FC<ZoomSliderProps> = function ({ graphZoom: { percent }, setGraphZoom = noop }) {
    const hanleMinusPlusChange = (type = 'minus') => {
        const preValue = Math.ceil(percent * 100);
        const curValue = type === 'minus' ? Math.max(0, preValue - 10) : Math.min(100, preValue + 10);
        const curPercent = Number((curValue / 100).toFixed(2));
        const curZoom = Number(((curValue / 100) * (maxZoom - minZoom) + minZoom).toFixed(2));
        setGraphZoom({
            percent: curPercent,
            zoom: curZoom
        });
    };

    const handleChange = value => {
        const curPercent = Number((value / 100).toFixed(2));
        const curZoom = Number(((value / 100) * (maxZoom - minZoom) + minZoom).toFixed(2));
        setGraphZoom({
            percent: curPercent,
            zoom: curZoom
        });
    };
    const value = Math.ceil(percent * 100);

    return (
        <div className={styles.zoomSliderBox}>
            <div className={styles.zoomMinus}>
                <MinusOutlined onClick={() => hanleMinusPlusChange('minus')} />
            </div>
            <div className={styles.zoomSlider}>
                <Slider value={value} min={0} max={100} tooltipVisible={false} step={10} onChange={handleChange} />
            </div>
            <div className={styles.zoomPlus}>
                <PlusOutlined onClick={() => hanleMinusPlusChange('plus')} />
            </div>
            <span className={styles.zoomNumber}>{value}%</span>
        </div>
    );
};

export default React.memo(ZoomSlider);
