import React, { CSSProperties, FunctionComponent } from 'react';
import classNames from 'classnames';
import { Size } from '../_util/enum';
import { getPrefixCls } from '../configure/utils';

export interface ButtonGroupProps {
  size?: Size;
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
}

const ButtonGroup: FunctionComponent<ButtonGroupProps> = props => {
  const { prefixCls: customizePrefixCls, size, className, ...others } = props;
  const prefixCls = getPrefixCls('btn-group', customizePrefixCls);

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case Size.large:
      sizeCls = 'lg';
      break;
    case Size.small:
      sizeCls = 'sm';
      break;
    default:
  }

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
    },
    className,
  );

  return <div {...others} className={classes} />;
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
