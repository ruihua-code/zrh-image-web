import { React } from 'framework/util';
import { Button } from 'antd';
import image500 from './images/500.png';
import Lang from './lang';
import styles from './scss/index.scss';

function ServerError() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageBox}>
                <img className="default-image" src={image500} alt={Lang.serverError} />
                <div className={styles.httpCode}>500</div>
                <div className={styles.httpDec}>{Lang.serverError}</div>
                <Button type="primary" className={styles.httpBtn} href="/">
                    {Lang.home}
                </Button>
            </div>
        </div>
    );
}

export default React.memo(ServerError);
