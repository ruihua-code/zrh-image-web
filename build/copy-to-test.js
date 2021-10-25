/**
 * 功能：复制生产代码到测试环境
 * 作者：安超
 * 日期：2018-12-07
 */
const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const { execCmd } = require('./utils')

const indexHTMLPath = path.resolve(__dirname, '../dist/index.html')
const indexHTML = fs.readFileSync(indexHTMLPath, 'utf-8')
fs.writeFileSync(indexHTMLPath, indexHTML.replace('%lastDeployTime%', `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`), 'utf-8')

const host = 'root@172.21.1.197'
const clearArr = ['rm -rf /var/www/html/example', 'mkdir /var/www/html/example']
const cmdArr = [
    `ssh ${host} '${clearArr.join(';')}'`,
    `scp -r ${path.join(__dirname.replace(/build$/, 'dist'), '*')} ${host}:/var/www/html/example`
]
const cmd = cmdArr.join(';')

execCmd(cmd, stdout => {
    console.log('部署完成', stdout)
})
