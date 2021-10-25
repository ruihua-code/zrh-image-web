/**
 * 功能：语言包
 * 作者：安超
 * 日期：2020/7/5
 */

import { intl } from 'framework/util';

export default {
    simple: intl.get('example.simple', { name: 'tom', friend: 'jerry' }),
    photo: {
        no: intl.get('example.photo', { photoNum: 0 }),
        one: intl.get('example.photo', { photoNum: 1 }),
        more: intl.get('example.photo', { photoNum: 100 })
    },
    passwordvalid: intl.get('example.passwordvalid', { expireNotice: 12 }),
    tip: intl.getHTML('example.tip'),
    tipWithVar: intl.getHTML('example.tipWithVar', { message: '<span>new Date()</span>' }),
    tipWithVar2: intl.getHTML('example.tipWithVar', { message: '<script>var a = 100; </script>' }),
    saleStart: intl.get('example.saleStart', { start: new Date() }),
    saleEnd: intl.get('example.saleEnd', { end: new Date() }),
    coupon: intl.get('example.coupon', { expires: new Date() }),
    time: intl.get('example.time', { theTime: new Date() }),
    salePrice: intl.get('example.salePrice', { price: 123456.789 }),
    getMessage() {
        return intl.get('example.notInComponent');
    }
};
