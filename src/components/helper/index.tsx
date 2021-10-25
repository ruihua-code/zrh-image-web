/**
 * 功能：使用指南
 * 作者：李玲
 * 日期：2020-03-27
 */
import { React, saveAs } from 'framework/util';
import { DownloadOutlined } from '@ant-design/icons';
import Lang from './lang';
import styles from './scss/index.scss';

const {
    helperDoc: { online, download, downloadFileName }
} = window.projectConf;

const Helper = function () {
    const handleDownloadClick = () => {
        saveAs(download, downloadFileName);
    };
    return (
        <div className={styles.helper}>
            <span className={styles.downloadContainer}>
                <span
                    className={styles.downloadButton}
                    title={Lang.downloadDoc}
                    onClick={handleDownloadClick}
                    role="presentation"
                >
                    <DownloadOutlined />
                </span>
            </span>
            <iframe
                width="100%"
                height="100%"
                style={{ display: 'block' }}
                title={Lang.instruction}
                src={online}
                frameBorder="0"
            />
        </div>
    );
};
export default React.memo(Helper);
