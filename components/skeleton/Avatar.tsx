import * as React from 'react';
import omit from 'lodash/omit';
import classNames from 'classnames';
import Element, { SkeletonElementProps } from './Element';
import { getPrefixCls } from '../configure/utils';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonAvatar extends React.Component<AvatarProps, any> {
  static defaultProps: Partial<AvatarProps> = {
    size: 'default',
    shape: 'circle',
  };

  renderSkeletonAvatar = () => {
    const { prefixCls: customizePrefixCls, className, active } = this.props;
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const otherProps = omit(this.props, ['prefixCls']);
    const cls = classNames(prefixCls, className, `${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
    });
    return (
      <div className={cls}>
        <Element prefixCls={`${prefixCls}-avatar`} {...otherProps} />
      </div>
    );
  };

  render() {
    return <>{this.renderSkeletonAvatar()}</>;
  }
}

export default SkeletonAvatar;
