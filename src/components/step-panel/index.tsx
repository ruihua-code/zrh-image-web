/**
 * 功能：步骤面板组件
 * 作者：qyc
 * 日期：2020-11-08
 */

import { React, noop } from 'framework/util';
import { Steps } from 'antd';
import styles from './scss/index.scss';

const { Step } = Steps;

type StepContentProps = {
    steps: any[];
    activeStep: number;
    panels: any[];
    onChange: (val) => void;
};

const StepContent: React.FC<StepContentProps> = React.memo(props => {
    const { steps = [], activeStep = 0, panels = [], onChange = noop } = props;
    const currentNode = panels[activeStep] || null;
    return (
        <div className={styles.mdStepPanelContent}>
            <Steps current={activeStep} onChange={onChange}>
                {steps.map(item => (
                    <Step title={item.title} key={item.title} />
                ))}
            </Steps>
            <div className={styles.mdStepPanelContentPanel}>{currentNode}</div>
        </div>
    );
});

export default StepContent;
