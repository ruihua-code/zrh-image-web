/**
 * 功能：API接口
 * 作者：安超
 * 日期：2017/6/29
 */
import actionCreator from './actions/actionCreator';
import store from '../store-common';

const dialogWidth = 500;
const dialog = {
    open({ title = '确认', content, footer = null, width = dialogWidth, ok = dialog.hide, cancel = dialog.hide }) {
        const onOK = () => {
            if (typeof ok === 'function' && ok()) {
                dialog.hide();
            }
        };
        store.dispatch(
            actionCreator.showDialog({
                title,
                content,
                width,
                footer,
                cancel,
                ok: onOK,
                dialogType: 'normal'
            })
        );

        return this;
    },
    confirm({ title = '确认', content, width = dialogWidth, ok, cancel = dialog.hide, dialogType = 'confirm' }) {
        const onOK = () => {
            if (typeof ok === 'function' && ok()) {
                dialog.hide();
            }
        };
        store.dispatch(
            actionCreator.showDialog({
                title,
                content,
                width,
                cancel,
                ok: onOK,
                dialogType
            })
        );

        return this;
    },

    alert({ title, content, width = dialogWidth, infoType = 'info', cancel = dialog.hide, ok = dialog.hide }) {
        store.dispatch(
            actionCreator.showDialog({
                title,
                content,
                width,
                infoType,
                cancel,
                ok,
                dialogType: 'alert'
            })
        );

        return this;
    },

    hide() {
        store.dispatch(actionCreator.hideDialog());

        return this;
    },

    setFooter(footer) {
        store.dispatch(
            actionCreator.setFooter({
                footer
            })
        );

        return this;
    }
};

export default dialog;
