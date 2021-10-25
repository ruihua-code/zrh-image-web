/**
 * 功能：生成模拟数据
 * 作者：安超
 * 日期： 2018/1/31
 */

const login = require('./modules/login')
const todos = require('./modules/todos')
const dashbord = require('./modules/dashbord')

module.exports = function () {
    return {
        ...login,
		...todos,
		...dashbord
    }
}
