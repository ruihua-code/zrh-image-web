/**
 * 功能：fontawesome图标
 * 作者：安超
 * 日期： 2019/3/19
 * 说明：样式在css/common/plugins/font-awesome.less
 */

import { React, classNames } from 'framework/util';

type FontAwesomeIconProps = {
    className: string;
};

function FontAwesomeIcon({ className = '' }: FontAwesomeIconProps) {
    return <i className={classNames('fa', className)} />;
}

export default React.memo(FontAwesomeIcon);
