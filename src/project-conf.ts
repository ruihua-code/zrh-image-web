/**
 * 功能：工程初始化，外部人员可以修改使用
 * 作者：安超
 * 日期：2018/7/4
 */

// var projectConf = {
// 使用var将变量写入window
// but const 为局部作用域，所以需要手动projectConf写入window
// mizi.2020/12/30
const projectConf = {
    systemName: '前端团队初始化工程',
    cancelToken: {},
    authHeader: {},
    // 使用指南相关配置
    helperDoc: {
        // 在线帮助文档地址
        online: '/docs/book/index.html',
        // 下载文档地址
        download: '/docs/download/helper.zip',
        // 下载文档时保存的文件名称
        downloadFileName: '用户使用手册'
    }
};

// 手动写入window
// todo 是否可以全局调用，而非暴力的写入window
window.projectConf = projectConf;

window.onload = function () {
    console.log('工程初始化完成');
};
