export default {
    // 公共
    global: {
        home: '返回首页',
        error: '错误',
        reason: '原因',
        enter: '确定',
        cancel: '取消',
        delete: '删除',
        title: '标题',
        // 404页
        errorMsg: '抱歉，您访问的页面不存在',
        // 403无权限
        authMsg: '抱歉，您无访问权限',
        // 500错误
        serverError: '抱歉，服务器出错了',
        // errorboundary
        modalTitle: '崩溃信息',
        crashMsg: '抱歉，您访问的页面崩溃了！',
        componentStack: '组件接收到非法数据！',
        crashReason: '不合理的处理'
    },
    header: {
        // header nav
        todoNav: 'todo示例',
        otherNav: '其它',
        helper: '使用指南',
        logout: '退出',
        // 帮助文档
        downloadDoc: '文档下载',
        instruction: '使用指南'
    },
    // 登录页
    login: {
        login: '登录',
        normal: '普通用户',
        admin: '管理员',
        usernameErrorMsg: '请输入用户名!',
        usernamePlaceholder: '用户名',
        passwordErrorMsg: '请输入密码!',
        passwordPlaceholder: '密码',
        roleErrorMsg: '请选择角色!'
    },
    // 多语言示例
    example: {
        simple: '我是{name}，我的朋友叫{friend}',
        photo: '你有{photoNum, number}张照片',
        passwordvalid: '密码还有{expireNotice}天到期，请联系管理员及时修改',
        tip: '这是一个红字<b style="color: #F00">HTML</b>',
        tipWithVar: '这是一个动态内容<b style="color: #F00">{message}</b>',
        saleStart: '拍卖将在{start, date}开始',
        saleEnd: '拍卖将在{end, date, full}结束',
        coupon: '优惠卷将在{expires, time, medium}过期',
        time: '时间是{theTime, time, short}',
        salePrice: '售价{price, number, CNY}',
        notInComponent: 'react-intl-universal可以在非React.Component的js文件进行国际化'
    }
};
