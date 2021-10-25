/**
 * 功能：加载当前语言包
 * 作者：安超
 * 日期：2019/7/1
 */
const LOCALES = [
    { value: 'ar-EG', name: '' },
    { value: 'az-AZ', name: '' },
    { value: 'bg-BG', name: '' },
    { value: 'ca-ES', name: '' },
    { value: 'cs-CZ', name: '' },
    { value: 'da-DK', name: '' },
    { value: 'de-DE', name: '' },
    { value: 'el-GR', name: '' },
    { value: 'en-GB', name: '' },
    { value: 'en-US', name: 'English' },
    { value: 'es-ES', name: '' },
    { value: 'et-EE', name: '' },
    { value: 'fa-IR', name: '' },
    { value: 'fi-FI', name: '' },
    { value: 'fr-BE', name: '' },
    { value: 'fr-FR', name: '' },
    { value: 'ga-IE', name: '' },
    { value: 'he-IL', name: '' },
    { value: 'hi-IN', name: '' },
    { value: 'hr-HR', name: '' },
    { value: 'hu-HU', name: '' },
    { value: 'hy-AM', name: '' },
    { value: 'id-ID', name: '' },
    { value: 'is-IS', name: '' },
    { value: 'it-IT', name: '' },
    { value: 'ja-JP', name: '' },
    { value: 'kn-IN', name: '' },
    { value: 'ko-KR', name: '' },
    { value: 'ku-IQ', name: '' },
    { value: 'lv-LV', name: '' },
    { value: 'mk-MK', name: '' },
    { value: 'mn-MN', name: '' },
    { value: 'ms-MY', name: '' },
    { value: 'nb-NO', name: '' },
    { value: 'ne-NP', name: '' },
    { value: 'nl-BE', name: '' },
    { value: 'nl-NL', name: '' },
    { value: 'pl-PL', name: '' },
    { value: 'pt-BR', name: '' },
    { value: 'pt-PT', name: '' },
    { value: 'ro-RO', name: '' },
    { value: 'ru-RU', name: '' },
    { value: 'sk-SK', name: '' },
    { value: 'sl-SI', name: '' },
    { value: 'sr-RS', name: '' },
    { value: 'sv-SE', name: '' },
    { value: 'ta-IN', name: '' },
    { value: 'th-TH', name: '' },
    { value: 'tr-TR', name: '' },
    { value: 'uk-UA', name: '' },
    { value: 'vi-VN', name: '' },
    { value: 'zh-CN', name: '简体中文' },
    { value: 'zh-TW', name: '' }
];

const getLocaleLoader = async function (lang) {
    return new Promise(resolve => {
        /* eslint-disable */
        const localeData = require(`./${lang}.js`).default;
        // antd特殊以下划线分隔lang's value
        const antdLocalData = require(`antd/es/locale/${lang.split('-').join('_')}.js`).default;
        resolve({
            localeData,
            antdLocalData
        });
    });
};

export default {
    LOCALES,
    getLocaleLoader
};
