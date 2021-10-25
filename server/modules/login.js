/**
 * 功能：登录模块
 * 作者：安超
 * 日期：2020/4/20
 */
const Mock = require('mockjs')

module.exports = {
    login: {
        statusCode: 200,
        message: '登录成功!'
    },
    logout: {
        statusCode: 200,
        message: '注销成功!'
    },
    getUserInfo: {
        statusCode: 200,
        message: '获得用户信息成功!',
        data: {
            username: Mock.Random.cname(),
            userType: '0'
        }
    }
}
