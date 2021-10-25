import { lazyload } from 'framework';
import { React, Route, Redirect, Switch } from 'framework/util';
import { Layout } from 'antd';
import config from 'conf';
import styles from './scss/index.scss';

type ComponentMainProps = {
    match: any;
};

const ComponentMain: React.FC<ComponentMainProps> = function ({ match: { url } }) {
    return (
        <Layout>
            <Layout.Content>
                <Switch>
                    <Route
                        path={config.url.app.filterTable.path}
                        component={lazyload(import('@/classic/container/filter-table'))}
                    />
                    <Route
                        path={config.url.app.treeTable.path}
                        component={lazyload(import('@/classic/container/tree-table'))}
                    />
                    <Route
                        path={config.url.app.treeCy.path}
                        component={lazyload(import('@/classic/container/tree-cy'))}
                    />
                    <Route
                        path={config.url.app.treeTable.path}
                        component={lazyload(import('@/classic/container/tree-table'))}
                    />
                    <Route
                        path={config.url.app.stepPanel.path}
                        component={lazyload(import('@/classic/components/step-panel'))}
                    />
                    <Route path={url} render={() => <Redirect to={config.url.app.filterTable.path} />} />
                </Switch>
            </Layout.Content>
        </Layout>
    );
};

export default React.memo(ComponentMain);
