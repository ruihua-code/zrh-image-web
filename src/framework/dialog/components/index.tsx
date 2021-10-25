import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import classNames from 'classnames';
import Lang from './lang';

const noop = function () { };

/*
  @dialogType: 弹窗类型
  @infoType: alert弹窗时不同的展示类型
  @width: 弹窗的宽度
  @title：弹窗标题
  @content：弹窗内容
  @show: 是否显示弹窗
  @ok: 确定按钮回调函数
  @cancel: 取消按钮回调函数
 */
type DialogProps = {
    dialogType?: 'normal' | 'alert' | 'confirm' | 'delete';
    infoType?: 'success' | 'warning' | 'info' | 'error';
    title?: string;
    content?: any;
    width?: number;
    footer?: any[];
    show?: boolean;
    ok?: () => void;
    cancel?: () => void;
};

const defaultProps = {
    dialogType: 'confirm',
    infoType: 'info',
    title: Lang.title(),
    content: null,
    width: 500,
    footer: [],
    show: false,
    ok: noop,
    cancel: noop
};

function Dialog(props: DialogProps & typeof defaultProps) {
    const {
        dialogType,
        infoType,
        title,
        content,
        width,
        footer,
        show,
        ok,
        cancel
    } = props;
    let footerNew = footer;
    let contentSec = content;
    let infoTypeCls = 'dialog-info';

    switch (dialogType) {
        case 'normal':
            break;
        case 'confirm':
            footerNew = [
                <Button key="confirm" type="primary" className="dialog-confirm" onClick={ok}>
                    {Lang.enter()}
                </Button>,
                <Button key="cancel" type="default" className="dialog-cancel" onClick={cancel}>
                    {Lang.cancel()}
                </Button>
            ];
            break;
        case 'delete':
            footerNew = [
                <Button key="confirm" danger className="dialog-confirm" onClick={ok}>
                    {Lang.delete()}
                </Button>,
                <Button key="cancel" type="default" className="dialog-cancel" onClick={cancel}>
                    {Lang.cancel()}
                </Button>
            ];
            break;
        case 'alert':
            footerNew = [
                <Button key="confirm" type="primary" className="dialog-confirm" onClick={ok}>
                    {Lang.enter()}
                </Button>
            ];

            if (infoType === 'success') {
                contentSec = (
                    <div>
                        <div className="pull-left">
                            <i className="fa fa-check fa-lg text-success" />
                            &nbsp;&nbsp;
                        </div>
                        {content}
                    </div>
                );
            } else if (infoType === 'warning') {
                contentSec = (
                    <div>
                        <div className="pull-left">
                            <i className="fa fa-exclamation-triangle fa-lg text-warning" />
                            &nbsp;&nbsp;
                        </div>
                        {content}
                    </div>
                );
            } else if (infoType === 'error') {
                contentSec = (
                    <div>
                        <div className="pull-left">
                            <i className="fa fa-close fa-lg text-danger" />
                            &nbsp;&nbsp;
                        </div>
                        {content}
                    </div>
                );
            } else {
                contentSec = (
                    <div>
                        <div className="pull-left">
                            <i className="fa fa-info fa-lg text-info" />
                            &nbsp;&nbsp;
                        </div>
                        {content}
                    </div>
                );
            }

            infoTypeCls = `dialog-${infoType}`;
            break;
        default:
            break;
    }

    return (
        <Modal
            className={classNames({ 'dialog-common': true, [infoTypeCls]: dialogType === 'alert' })}
            title={title}
            footer={footerNew}
            visible={show}
            wrapClassName="dialogwapper"
            maskClosable={false}
            width={width}
            onOk={ok}
            onCancel={cancel}
            destroyOnClose
        >
            {contentSec}
        </Modal>
    );
}

Dialog.defaultProps = defaultProps;

export default React.memo(Dialog);
