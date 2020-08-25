import React, { PureComponent } from 'react';
import { stopEvent, stopPropagation } from '@buildrun/dataset';
import Icon from '../icon';

export interface CloseButtonProps {
  value: any;
  index: number;
  onClose: (e, value: any, index: number) => void;
}

export default class CloseButton extends PureComponent<CloseButtonProps> {
  handleClick = (e) => {
    stopEvent(e);
    const { onClose, value, index } = this.props;
    onClose(e, value, index);
  };

  render() {
    return (
      <Icon type="cancel" onClick={this.handleClick} onFocus={stopPropagation} onMouseDown={stopEvent} tabIndex={-1} />
    );
  }
}
