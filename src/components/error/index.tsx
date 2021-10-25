/**
 * 功能：404页
 * 作者：安超
 * 日期： 2016/3/19
 */
import { React } from 'framework/util';
import { Button } from 'antd';
import image404 from './images/404.png';
import Lang from './lang';
import styles from './scss/index.scss';

function Error() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageBox}>
                <img className="default-image" src={image404} alt={Lang.errorMsg} />
                <div className={styles.httpCode}>404</div>
                <div className={styles.httpDec}>{Lang.errorMsg}</div>
                <Button type="primary" className={styles.httpBtn} href="/">
                    {Lang.home}
                </Button>
            </div>
        </div>
    );
}

export default React.memo(Error);
