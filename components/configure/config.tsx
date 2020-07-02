import { ReactNode } from 'react';
import { observable, ObservableMap } from 'mobx';
import { categories } from 'choerodon-ui-font';
import { Config as DataSetConfig } from '@buildrun/dataset/lib/configure';
import { LabelLayout } from 'choerodon-ui/pro/lib/form/enum';
import { TableQueryBarType } from 'choerodon-ui/pro/lib/table/enum';
import { expandInconProps, TablePaginationConfig, TableQueryBarHook } from 'choerodon-ui/pro/lib/table/Table';
import { ButtonProps } from 'choerodon-ui/pro/lib/button/Button';
import { ButtonColor, FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { $l } from 'choerodon-ui/pro/lib/locale-context';
import { SpinProps } from '../spin';
import { Size } from '../_util/enum';

export type renderEmptyHandler = (componentName?: string) => ReactNode;

export interface Config extends DataSetConfig {
  prefixCls?: string;
  proPrefixCls?: string;
  iconfontPrefix?: string;
  ripple?: boolean;
  labelLayout?: LabelLayout;
  queryBar?: TableQueryBarType | TableQueryBarHook;
  tableBorder?: boolean;
  tableHighLightRow?: boolean;
  tableRowHeight?: 'auto' | number;
  tableColumnResizable?: boolean;
  tableExpandIcon?: (props: expandInconProps) => ReactNode;
  tableSpinProps?: SpinProps;
  tableButtonProps?: ButtonProps;
  tableCommandProps?: ButtonProps;
  pagination?: TablePaginationConfig | false;
  modalSectionBorder?: boolean;
  modalOkFirst?: boolean;
  modalButtonProps?: ButtonProps;
  buttonFuncType?: FuncType;
  buttonColor?: ButtonColor;
  renderEmpty?: renderEmptyHandler;
  icons?: { [key: string]: string[] } | string[];
}

export type ConfigKeys = keyof Config;
const defaultRenderEmpty: renderEmptyHandler = (componentName?: string): ReactNode => {
  switch (componentName) {
    case 'Table':
      return $l('Table', 'empty_data');
    case 'Select':
      return $l('Select', 'no_matching_results');
    default:
  }
};
const defaultButtonProps = { color: ButtonColor.primary, funcType: FuncType.flat };
const defaultSpinProps = { size: Size.default, wrapperClassName: '' };
const globalConfig: ObservableMap<ConfigKeys, Config[ConfigKeys]> = observable.map<ConfigKeys,
  Config[ConfigKeys]>([
  ['prefixCls', 'c7n'],
  ['proPrefixCls', 'c7n-pro'],
  ['iconfontPrefix', 'icon'],
  ['ripple', true],
  ['labelLayout', LabelLayout.horizontal],
  ['queryBar', TableQueryBarType.normal],
  ['tableBorder', true],
  ['tableHighLightRow', true],
  ['tableRowHeight', 30],
  ['tableColumnResizable', true],
  ['tableSpinProps', defaultSpinProps],
  ['tableButtonProps', defaultButtonProps],
  ['tableCommandProps', defaultButtonProps],
  ['modalSectionBorder', true],
  ['modalOkFirst', true],
  ['buttonColor', ButtonColor.default],
  ['buttonFuncType', FuncType.raised],
  ['renderEmpty', defaultRenderEmpty],
  ['icons', categories],
]);

export default globalConfig;
