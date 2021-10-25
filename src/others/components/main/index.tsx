import { lazyload } from 'framework';
import { React, Route, Redirect, Switch } from 'framework/util';
import { Layout } from 'antd';
import config from 'conf';
import styles from './scss/index.scss';

type ComponentProps = {
    match: any;
};

const ComponentMain: React.FC<ComponentProps> = function ({ match: { url } }) {
    return (
        <Layout>
            <Layout.Content>
                <Switch>
                    <Route path={config.url.app.intl.path} component={lazyload(import('@/others/components/intl'))} />
                    <Route
                        path={config.url.app.transition.path}
                        component={lazyload(import('@/others/components/transition'))}
                    />
                    <Route
                        path={config.url.app.state.path}
                        component={lazyload(import('@/others/components/state/container'))}
                    />
                    <Route path={config.url.app.antd.path} component={lazyload(import('@/others/container/antd'))} />
                    <Route
                        path={config.url.app.drag.path}
                        component={lazyload(import('@/others/components/drag/main'))}
                    />
                    <Route path={config.url.app.map.path} component={lazyload(import('@/others/components/map'))} />
                    <Route
                        path={config.url.app.chart.path}
                        component={lazyload(import('@/others/components/charts/components/bar'))}
                    />
                    <Route
                        path={config.url.app.error.path}
                        component={lazyload(import('@/others/components/error-boundary'))}
                    />
                    <Route path={url} render={() => <Redirect to={config.url.app.intl.path} />} />
                </Switch>
            </Layout.Content>
        </Layout>
    );
};

export default React.memo(ComponentMain);
