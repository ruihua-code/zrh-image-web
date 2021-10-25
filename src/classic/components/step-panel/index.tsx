/**
 * 功能：步骤面板组件
 * 作者：qyc
 * 日期：2020-11-08
 */

import { React } from 'framework/util';
import { Button } from 'antd';
import StepPanel from '../../../components/step-panel';
import styles from './scss/index.scss';

type StepContentProps = {};

const StepContent: React.FC<StepContentProps> = function () {
    const [activeStep, setStep] = React.useState(0);
    const steps = [
        {
            title: '第一步'
        },
        {
            title: '第二步'
        },
        {
            title: '第三步'
        },
        {
            title: '第四步'
        }
    ];

    const handleChange = e => {
        setStep(e);
    };

    const first = (
        <>
            <div className={styles.stepPanelContentPanel}>
                <div className={styles.stepPanelContentPanelOverwindow}> 第一步 带滚动条</div>
            </div>
            <div className={styles.footerBar}>
                <Button onClick={() => handleChange(activeStep + 1)}>下一步</Button>
            </div>
        </>
    );
    const second = (
        <>
            <div className={styles.stepPanelContentPanel}>
                <div className={styles.stepPanelContentPanelOverwindow}> 第二步 带滚动条</div>
            </div>
            <div className={styles.footerBar}>
                <Button onClick={() => handleChange(activeStep - 1)}>上一步</Button>
                <Button onClick={() => handleChange(activeStep + 1)}>下一步</Button>
            </div>
        </>
    );
    const third = (
        <>
            <div className={styles.stepPanelContentPanel}>
                <div className={styles.stepPanelContentPanelCommon}> 第三步 不带滚动条</div>
            </div>
            <div className={styles.footerBar}>
                <Button onClick={() => handleChange(activeStep - 1)}>上一步</Button>
                <Button onClick={() => handleChange(activeStep + 1)}>下一步</Button>
            </div>
        </>
    );
    const fanil = (
        <>
            <div className={styles.stepPanelContentPanel}>
                <div className={styles.stepPanelContentPanelCommon}> 第四步 不带滚动条</div>
            </div>
            <div className={styles.footerBar}>
                <Button onClick={() => handleChange(activeStep - 1)}>上一步</Button>
            </div>
        </>
    );

    return (
        <div className={styles.demoStepPanelClassic}>
            <div className={styles.stepPanelContent}>
                <StepPanel
                    steps={steps}
                    activeStep={activeStep}
                    onChange={handleChange}
                    panels={[first, second, third, fanil]}
                />
            </div>
        </div>
    );
};

export default StepContent;
