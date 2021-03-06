import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { computed } from 'mobx';
import DataSet from '@choerodon/dataset';
import { Lang } from '@choerodon/dataset/lib/locale-context/enum';
import ViewComponent, { ViewComponentProps } from '../core/ViewComponent';

/**
 * 可绑定数据源的组件.
 */
export interface DataSetComponentProps extends ViewComponentProps {
  /** 数据源 */
  dataSet?: DataSet;
}

export default class DataSetComponent<T extends DataSetComponentProps> extends ViewComponent<T> {
  static propTypes = {
    dataSet: PropTypes.object,
    ...ViewComponent.propTypes,
  };

  @computed
  get dataSet(): DataSet | undefined {
    return this.observableProps.dataSet;
  }

  @computed
  get lang(): Lang {
    const { dataSet } = this;
    if (dataSet && dataSet.lang) {
      return dataSet.lang;
    }
    return super.lang;
  }

  getObservableProps(props, _context) {
    return {
      dataSet: props.dataSet,
    };
  }

  getOtherProps() {
    return omit(super.getOtherProps(), ['dataSet']);
  }
}
