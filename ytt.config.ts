import { defineConfig } from '@mlamp/yapi-to-typescript';

/**
 * 3. 修改时大部分情况只需要修改这里，如新增，修改，删除yapi中的分类
 */
const config = [
    {
        // 分类ids，可以将多个分类中的接口信息生成到同一个ts文件中
        ids: [149],
        // 输出的ts文件存储模块文件夹名称，如本配置将输出到/src/service/types/index.ts中
        name: 'login'
    },
    {
        ids: [157],
        name: 'todos'
    }
];

const createCategories = function (ids: number[]) {
    return ids.map(id => ({
        id,
        // 自定义ts中interface名称生成规则
        getRequestFunctionName(interfaceInfo, changeCase) {
            // path肯定是唯一的
            const list = interfaceInfo.path.split('/') as string[];
            // 添加method用于区分post，get，put请求可能path相同
            const firstWord = list[0].toLowerCase();
            if (!/^get|^post|^put|^delete/.test(firstWord)) {
                list.unshift(interfaceInfo.method);
            }
            return changeCase.camelCase(list.join(' '));
        }
    }));
};

export default defineConfig(
    config.map(item => ({
        // 1. 此处配置yapi的访问地址
        serverUrl: 'http://yapi.po.mlamp.cn',
        typesOnly: false,
        target: 'typescript',
        reactHooks: {
            enabled: false
        },
        prodEnvName: 'production',
        outputFilePath: `src/${item.name}/types/index.ts`,
        requestFunctionFilePath: `src/${item.name}/types/request.ts`,
        dataKey: 'data',
        projects: [
            {
                // 2. 此处配置yapi项目的访问token
                token: '5cf2d85458c8fdf24931ef84e85c8c99cb5a4d8f9362262ceba793cd4c847d76',
                categories: createCategories(item.ids)
            }
        ]
    }))
);
