import { React, Helper, _ } from 'framework/util';
import ReactEcharts from 'echarts-for-react';
import optionObj from './option';
import styles from './scss/index.scss';

type DynamicProps = {};

const Dynamic: React.FC<DynamicProps> = function () {
    let count = 0;
    const [opt, setOpt] = React.useState(optionObj);

    const fetchNewDate = () => {
        const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
        const option = _.cloneDeep(opt); // immutable
        // option.title.text = '动态图表'
        const data0 = option.series[0].data;
        const data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push(+(Math.random() * 10 + 5).toFixed(1));

        option.xAxis[0].data.shift();
        option.xAxis[1].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.push(count++);

        setOpt(option);
    };

    Helper.useInterval(fetchNewDate);

    return (
        <div className={styles.echartsExample}>
            <ReactEcharts option={opt} style={{ height: 400 }} />
        </div>
    );
};

export default Dynamic;
