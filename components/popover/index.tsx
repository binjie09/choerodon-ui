import React, { Component, ReactNode } from 'react';
import { warning } from '@choerodon/dataset';
import Tooltip, { AbstractTooltipProps } from '../tooltip';
import { getPrefixCls } from '../configure/utils';

export interface PopoverProps extends AbstractTooltipProps {
  title?: ReactNode;
  content?: ReactNode;
}

export default class Popover extends Component<PopoverProps, {}> {
  static displayName = 'Popover';

  static defaultProps = {
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
  };

  private tooltip: Tooltip;

  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }

  getOverlay() {
    const { title, content } = this.props;
    const prefixCls = this.getPrefixCls();
    warning(
      !('overlay' in this.props),
      'Popover[overlay] is removed, please use Popover[content] instead',
    );
    return (
      <div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>{content}</div>
      </div>
    );
  }

  saveTooltip = (node: any) => {
    this.tooltip = node;
  };

  getPrefixCls() {
    const { prefixCls } = this.props;
    return getPrefixCls('popover', prefixCls);
  }

  render() {
    const props = { ...this.props };
    delete props.title;
    return (
      <Tooltip
        {...props}
        prefixCls={this.getPrefixCls()}
        ref={this.saveTooltip}
        overlay={this.getOverlay()}
      />
    );
  }
}
