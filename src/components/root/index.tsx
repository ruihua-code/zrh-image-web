/**
 * 功能：根组件
 * 作者：安超
 * 日期： 2016/3/26
 */
import { Provider } from 'react-redux';
import { lazyload } from 'framework';
import { intl, React, Route, Redirect, Switch, hot, ErrorBoundary, _, Helper, dayjs } from 'framework/util';
import { ConfigProvider } from 'antd';
import config from 'conf';
import storeCommon from 'framework/store-common';
import Dialog from 'framework/dialog/container';
import Loading from 'loading/container';
import LanguageSelect from '../language-select/index';
import localsRes from '../../locales/loader';

// todo 更优雅的调用dayjs的国际化文件
// by mizi 2021.0104
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dayjs/locale/zh-cn');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dayjs/locale/en');

const { url } = config;
const MainAppView = lazyload(import('@/container/app'));
const NotFindView = lazyload(import('@/components/error'));

const { LOCALES, getLocaleLoader } = localsRes;
const supportLocales = LOCALES.filter(item => item.name.trim().length > 0);

const RootRoutesView = function () {
    const currentLocaleDefault = 'zh-CN';
    let currentLocale = currentLocaleDefault;
    const [initDone, setInitDone] = React.useState(false);
    const [antdLocaleData, setAntdLocaleData] = React.useState(null);

    const loadLocales = function () {
        currentLocale = intl.determineLocale({
            cookieLocaleKey: 'lang'
        });

        if (!_.find(supportLocales, { value: currentLocale })) {
            Helper.setCookie('lang', currentLocaleDefault);
            currentLocale = currentLocaleDefault;
        } else {
            Helper.setCookie('lang', currentLocale);
        }

        getLocaleLoader(currentLocale).then(res => {
            // 原因：locales 的参数必须遵从 BCP 47 规范，locales 标记必须是"en"、 "en-US" 、 "zh-Hans-CN" 等，这个标记包含了语言、地区和国家。
            // 完整的列表可以查看 IANA language subtag registry。
            // https://github.com/sundway/blog/issues/9
            intl.init({
                currentLocale,
                locales: {
                    [currentLocale]: res.localeData
                }
            }).then(() => {
                setAntdLocaleData(res.antdLocalData);
                dayjs.locale(currentLocale.toLowerCase());
                setInitDone(true);
            });
        });
    };

    // componentDidMount
    Helper.ComDidMount(React.useEffect, loadLocales);

    if (!initDone) {
        return <Loading show />;
    }

    return (
        <ConfigProvider locale={antdLocaleData}>
            <ErrorBoundary>
                <>
                    <Switch>
                        <Route path={url.root} exact render={() => <Redirect to={url.login.path} />} />
                        <Route path={url.login.path} component={lazyload(import('@/login/container'))} />
                        <Route
                            path={url.permission.path}
                            component={lazyload(import('@/components/permission-denied'))}
                        />
                        <Route path={url.serverError.path} component={lazyload(import('@/components/server-error'))} />
                        <Route path={url.app.root.path} component={MainAppView} />
                        <Route component={NotFindView} />
                    </Switch>
                    <Provider store={storeCommon}>
                        <Dialog />
                        <Loading />
                    </Provider>
                    <LanguageSelect className="hide" value={currentLocale} options={supportLocales} />
                </>
            </ErrorBoundary>
        </ConfigProvider>
    );
};

export default hot(module)(React.memo(RootRoutesView));
