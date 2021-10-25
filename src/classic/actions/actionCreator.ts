/**
 * 功能：动作创建
 * 作者：yuchen
 * 日期：2020/11/08
 */
import { createActions } from 'framework';
import config from 'conf';

const {
    constant: { mockPrefix }
} = config;

const actionCreator = createActions({
    getTableDataClassic: {
        url: `${mockPrefix}/classic/getTableLIst`,
        method: 'get'
    },
    getResourceListClassic: {
        url: `${mockPrefix}/classic/getResourceList`,
        method: 'get'
    }
});

export default actionCreator;
