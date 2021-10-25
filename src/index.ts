/**
 * 功能：工程入口
 * 作者：安超
 * 日期：2015/7/1
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { sendLog } from 'framework/ajax';
import projectInit from 'framework/project-init';
import './css/index.scss';

/* eslint-disable */
// require(`@mlamp/antd-theme/build/${THEME}/index.less`);
/* eslint-enable */

projectInit(document.querySelector('#container'), () => {
    console.log('工程初始化完成！！');

    // 图片加载失败处理
    document.addEventListener(
        'error',
        e => {
            const elem = e.target as HTMLImageElement;
            if (elem.tagName.toLowerCase() === 'img') {
                elem.src = `/${THEME}/images/404.png`;
                // elem.className = 'img-responsive'
            }
        },
        true
    );

    // 日志收集
    document.addEventListener(
        'click',
        e => {
            const elem = e.target as HTMLElement;
            const { opid: opId, content } = elem.dataset;
            const actualContent = content || elem.innerText;

            if (opId) {
                sendLog({ opId: Number(opId), content: actualContent });
            }
        },
        true
    );
});

if (process.env.NODE_ENV === 'production') {
    window.addEventListener(
        'beforeunload',
        e => {
            const msg = '确定要离开吗？';
            e.returnValue = msg;
            return msg;
        },
        false
    );
}
