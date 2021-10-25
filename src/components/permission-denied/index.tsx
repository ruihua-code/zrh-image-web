import { React } from 'framework/util';
import { Button } from 'antd';
import image403 from './images/403.png';
import Lang from './lang';
import styles from './scss/index.scss';

function PermissionDenied() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageBox}>
                <img className="default-image" src={image403} alt={Lang.authMsg} />
                <div className={styles.httpCode}>403</div>
                <div className={styles.httpDec}>{Lang.authMsg}</div>
                <Button type="primary" className={styles.httpBtn} href="/">
                    {Lang.home}
                </Button>
            </div>
        </div>
    );
}

export default React.memo(PermissionDenied);
