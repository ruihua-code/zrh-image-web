export default {
    // 公共
    global: {
        home: 'HOME',
        error: 'error',
        reason: 'reason',
        enter: 'ok',
        cancel: 'cancel',
        delete: 'delete',
        title: 'title',
        // 404页
        errorMsg: 'sorry，the page you visited does not exist',
        // 403无权限
        authMsg: 'sorry，you do not have access rights',
        // 500错误
        serverError: 'sorry，there was an error on the server',
        // errorboundary
        modalTitle: 'crash information',
        crashMsg: 'sorry，the page you visited crashed！',
        componentStack: 'component received illegal data！',
        crashReason: 'unreasonable treatment'
    },
    header: {
        // header nav
        todoNav: 'TODOS',
        otherNav: 'OTHERS',
        helper: 'helper',
        logout: 'logout',
        // 帮助文档
        downloadDoc: 'DownLoad',
        instruction: 'Instruction'
    },
    // 登录页
    login: {
        login: 'Login',
        normal: 'normal',
        admin: 'admin',
        usernameErrorMsg: 'please input your username!',
        usernamePlaceholder: 'username',
        passwordErrorMsg: 'please input your password!',
        passwordPlaceholder: 'password',
        roleErrorMsg: 'please select roles!'
    },
    // 多语言示例
    example: {
        simple: 'I am {name}，my friend is {friend}',
        photo: 'You have {photoNum, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}',
        passwordvalid:
            'Password has {expireNotice, plural, =1{1 day} other{# days}}, to expire, ' +
            'please contact the administrator to modify in a timely.',
        tip: 'This is a red<b style="color: #F00">HTML</b>',
        tipWithVar: 'This is dynamic<b style="color: #F00">{message}</b>',
        saleStart: 'Sale begins {start, date}',
        saleEnd: 'Sale ends {end, date, long}',
        coupon: 'Coupon expires at {expires, time, medium}',
        time: 'time is {theTime, time, short}',
        salePrice: 'The price is {price, number, USD}',
        notInComponent: 'react-intl-universal is able to internationalize message not in React.Component'
    }
};
