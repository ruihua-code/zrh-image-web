/**
 * 功能：地图测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/util';
import { Map, Label, Base } from 'rc-bmap';
import styles from './scss/index.scss';

const { Point, Size } = Base;
const { Content } = Label;

type MapProps = {};
const MapSimple: React.FC<MapProps> = function () {
    return (
        <div className={styles.customcontrolMap}>
            <Map ak="nvwlnIROmNKspQWn4IaR0g1OebViUF43" scrollWheelZoom zoom={16}>
                <Point name="center" lng="116.417854" lat="39.921988" />
                <Label>
                    <Point name="position" lng="116.417854" lat="39.921988" />
                    <Size name="offset" width="30" height="-30" />
                    <Content>
                        <p>ddddd</p>
                        欢迎使用百度地图，这是一个简单的文本标注哦~
                    </Content>
                </Label>
            </Map>
        </div>
    );
};

export default React.memo(MapSimple);
