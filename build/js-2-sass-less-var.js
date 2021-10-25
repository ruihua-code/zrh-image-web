/**
 * 功能：js变量转换为less&sass颜色值
 * 作者：安超
 * 日期：2020/2/26
 */
const fs = require('fs');
const path = require('path');

// 主题颜色目录
const themeColorPath = path.resolve(__dirname, '../src/css/theme-js-var');
// 生成主题入口文件次数
let createdEnterFile = false;

// 根据主题颜色值分别生成scss&less文件
const colors = fs.readdirSync(themeColorPath);
// 生成scss&less文件
const createFile = function (fileName) {
    const themeName = fileName.replace(/-var.js$/, '');
    const filePath = path.resolve(themeColorPath, fileName);
    delete require.cache[filePath];
    // eslint-disable-next-line import/no-dynamic-require
    const colorJSON = require(filePath);

    // 判断 css/theme下是否存在themeName是否存在
    const themePath = path.resolve(__dirname, `../src/css/common/theme/${themeName}`);
    if (!fs.existsSync(themePath)) {
        fs.mkdirSync(themePath);
    }

    // 分别写入scss&less文件
    const scssContent = Object.keys(colorJSON)
        .map((key) => `\$${key}: ${colorJSON[key].replace(/\@/g, '$')};`)
        .join('\n');
    const scssPath = path.resolve(__dirname, `../src/css/common/theme/${themeName}/${themeName}-var.scss`);
    fs.writeFileSync(scssPath, scssContent);

    const lessContent = Object.keys(colorJSON)
        .map((key) => `@${key}: ${colorJSON[key]};`)
        .join('\n');
    const lessPath = path.resolve(themePath, `${themeName}-var.less`);
    fs.writeFileSync(lessPath, lessContent);

    // 生成主题下入口文件，仅执行一次即可
    if (!createdEnterFile) {
        createdEnterFile = true;

        // 文件内容
        const content = `@import "~mlamp-theme-antd/theme/${themeName}/antd-ext";\n@import "${themeName}-var";`;
        fs.writeFileSync(path.resolve(themePath, 'index.scss'), content);
    }
};
colors.forEach((fileName) => {
    createFile(fileName);
});

// 监听所有颜色文件变化
fs.watch(themeColorPath, (eventType, fileName) => {
    console.log(`事件类型: ${eventType}`);
    if (fileName) {
        console.log(`文件名: ${fileName}`);
        createFile(fileName);
    } else {
        console.log('文件名未提供');
    }
});
