/**
 * 功能： 业务工具类
 * 作者： 安超
 * 日期： 2018/7/11
 */

import * as ReactHooks from './react-hooks';

function Helper() {}

Helper.prototype = {
    constructor: Helper,
    getHash() {
        return window.location.hash;
    },
    getPathname() {
        return window.location.pathname;
    },
    exeCb(fnCb) {
        if (fnCb && typeof fnCb === 'function') {
            fnCb();
        }
    },
    getStrLen(str) {
        // 计算字符串长度(英文占1个字符，中文汉字占2个字符)
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }

        return len;
    },
    getStrByLen(str, len) {
        if (this.getStrLen(str) < len) {
            return str;
        }
        const aRes = [];
        let l = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                l += 2;
            } else {
                l++;
            }

            if (l <= len) {
                aRes.push(str.charAt(i));
            }
        }

        return aRes.join('');
    },
    convertDate2FormatStr(oDate, format) {
        const o = {
            'M+': oDate.getMonth() + 1, // month
            'd+': oDate.getDate(), // day
            'h+': oDate.getHours(), // hour
            'm+': oDate.getMinutes(), // minute
            's+': oDate.getSeconds(), // second
            'q+': Math.floor((oDate.getMonth() + 3) / 3), // quarter
            S: oDate.getMilliseconds() // millisecond
        };
        let formatCopy = format;

        if (/(y+)/.test(formatCopy)) {
            formatCopy = formatCopy.replace(RegExp.$1, `${oDate.getFullYear()}`.substr(4 - RegExp.$1.length));
        }

        for (const k in o) {
            if (new RegExp(`(${k})`).test(formatCopy)) {
                formatCopy = formatCopy.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
                );
            }
        }

        return formatCopy;
    },
    formatDateString(sDate) {
        // 默认sDate格式为：2015-10-09 20:45:35
        let date = sDate;
        if (typeof date === 'string') {
            date = date.trim();

            if (date.length > 0) {
                return date.replace(/:\d{2}$/, '');
            }
        }

        return date;
    },
    decimal(e) {
        const nKeyCode = e.which;
        const sValues = e.currentTarget.value;

        if (
            nKeyCode === 13 ||
            nKeyCode === 8 ||
            nKeyCode === 46 ||
            (nKeyCode >= 37 && nKeyCode <= 40) ||
            (nKeyCode >= 48 && nKeyCode <= 57) ||
            (nKeyCode >= 96 && nKeyCode <= 105) ||
            nKeyCode === 190 ||
            nKeyCode === 110
        ) {
            // 是否已包含小数点
            if (nKeyCode === 190 || nKeyCode === 110) {
                return sValues.includes('.');
            }

            return false;
        }

        return false;
    },
    number(e) {
        // 数字，删除(8,46),方向（37-40）
        const nKeyCode = e.which;
        return (
            (nKeyCode >= 48 && nKeyCode <= 57) ||
            (nKeyCode >= 96 && nKeyCode <= 105) ||
            nKeyCode === 8 ||
            nKeyCode === 46 ||
            (nKeyCode >= 37 && nKeyCode <= 40)
        );
    },
    mobileNumber(e) {
        const nKeyCode = e.which;
        const target = e.currentTarget;
        const sPhone = target.value;
        if (
            nKeyCode === 13 ||
            nKeyCode === 8 ||
            nKeyCode === 46 ||
            (nKeyCode >= 37 && nKeyCode <= 40) ||
            (nKeyCode >= 48 && nKeyCode <= 57) ||
            (nKeyCode >= 96 && nKeyCode <= 105)
        ) {
            return true;
        }

        // 11位后数字不能输入数字,当未选中时禁止输入
        if (
            sPhone.length > 10 &&
            target.selectionStart === target.selectionEnd &&
            ((nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105))
        ) {
            return false;
        }

        return false;
    },
    validatePhone(sPhone) {
        const nLen = sPhone.length;

        return !(nLen !== 11 || (nLen === 11 && !/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(sPhone)));
    },

    validateEmail(email) {
        return /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/.test(email);
    },
    onKeyDown(e) {
        const nKeyCode = e.which;
        return (
            nKeyCode === 13 ||
            nKeyCode === 8 ||
            nKeyCode === 46 ||
            (nKeyCode >= 37 && nKeyCode <= 40) ||
            (nKeyCode >= 48 && nKeyCode <= 57) ||
            (nKeyCode >= 96 && nKeyCode <= 105)
        );
    },
    setCookie(name, value, expireDays = 365) {
        const exDate = new Date();
        exDate.setDate(exDate.getDate() + expireDays);
        document.cookie = `${name}=${escape(value)};expires=${exDate.toUTCString()};path=/`;
    },
    getParentByKey(key, menuKey, menuData) {
        /*
         * @key 每个节点的唯一标识值
         * @menuKey 每个节点的唯一标识键
         * @menuData 菜单数据数组
         * */
        const arrRes = [];

        const find = (nodeId, arr) => {
            for (let i = 0, len = arr.length; i < len; i++) {
                const node = arr[i];
                if (node?.children) {
                    if (node.children.some(item => item[menuKey] === nodeId)) {
                        arrRes.unshift(node);
                        // 查找父级的父级,必须是menuData
                        find(node[menuKey], menuData);
                        break;
                    } else {
                        find(nodeId, node.children);
                    }
                }
            }
        };

        find(key, menuData);
        return arrRes;
    },

    ...ReactHooks
};

export default new Helper();
