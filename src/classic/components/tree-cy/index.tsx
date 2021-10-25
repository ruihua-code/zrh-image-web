import { React, PureComponent } from 'framework/util';
import cytoscape from 'cytoscape';
import TopBox from '../tree-cy-operation';
import TreePanel from '../tree-table-tree';
import styles from './scss/index.scss';

type ViewProps = {};
type ViewState = {};

class View extends PureComponent<ViewProps, ViewState> {
    graphRef = null;

    cyEntity = null;

    constructor(props) {
        super(props);
        this.graphRef = React.createRef();
        this.cyEntity = null;
    }

    componentDidMount() {
        this.initGraph();
    }

    initGraph() {
        if (this?.graphRef?.current) {
            this.cyEntity = cytoscape({
                container: this.graphRef.current,
                elements: {
                    nodes: [
                        {
                            data: { id: 'a' }
                        },
                        {
                            data: { id: 'b' }
                        }
                    ],
                    edges: [
                        {
                            data: { id: 'ab', source: 'a', target: 'b' }
                        }
                    ]
                },
                zoom: 1,
                minZoom: 0.02
            });
        } else {
            this.initGraph();
        }
    }

    render() {
        return (
            <div className={styles.demoCyTableClassic}>
                <div className={styles.treeTableContent}>
                    <div className={styles.treeTableLeft}>
                        <TreePanel title="目录" />
                    </div>
                    <div className={styles.treeTableRight}>
                        <TopBox />
                        <div className={styles.graphContentPanel}>
                            <div ref={this.graphRef} className={styles.graphBox} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
