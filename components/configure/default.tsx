import { LabelLayout } from 'choerodon-ui/pro/lib/form/enum';
import { TableQueryBarType } from 'choerodon-ui/pro/lib/table/enum';
import { ButtonColor, FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { categories } from 'choerodon-ui-font';
import { renderEmptyHandler } from 'choerodon-ui/lib/configure/config';
import { ReactNode } from 'react';
import { $l } from 'choerodon-ui/pro/lib/locale-context';
import { Size } from 'choerodon-ui/lib/_util/enum';

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

const defaults = {
  prefixCls: 'c7n',
  proPrefixCls: 'c7n-pro',
  iconfontPrefix: 'icon',
  ripple: true,
  labelLayout: LabelLayout.horizontal,
  queryBar: TableQueryBarType.normal,
  tableBorder: true,
  tableHighLightRow: true,
  tableRowHeight: 30,
  tableColumnResizable: true,
  tableSpinProps: defaultSpinProps,
  tableButtonProps: defaultButtonProps,
  tableCommandProps: defaultButtonProps,
  modalSectionBorder: true,
  modalOkFirst: true,
  modalType: 'yqcloud',
  buttonColor: ButtonColor.default,
  buttonFuncType: FuncType.raised,
  renderEmpty: defaultRenderEmpty,
  icons: categories,
};

export default defaults;
