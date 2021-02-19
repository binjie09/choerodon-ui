import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure/utils';
import StatisticNumber from './Number';
import Countdown from './Countdown';
import { valueType, FormatConfig } from './utils';


export interface StatisticProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

interface CompoundedComponent
    extends React.ForwardRefExoticComponent<StatisticProps> {
    Countdown: typeof Countdown;
}

const Statistic = forwardRef((props: StatisticProps,_ref) => {
  const {
    prefixCls : customizePrefixCls,
    className,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const prefixCls = getPrefixCls('statistic', customizePrefixCls);
  const valueNode = <StatisticNumber {...props} prefixCls={prefixCls} value={value} />;
  const cls = classNames(prefixCls, className);
  return (
    <div className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <div style={valueStyle} className={`${prefixCls}-content`}>
        {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
        {valueRender ? valueRender(valueNode) : valueNode}
        {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
      </div>
    </div>
  );
}) as CompoundedComponent

Statistic.defaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
};

Statistic.Countdown = Countdown


export default Statistic;
