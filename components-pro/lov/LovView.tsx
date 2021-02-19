import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import DataSet from '@buildrun/dataset';
import KeyCode from 'choerodon-ui/lib/_util/KeyCode';
import { getConfig } from 'choerodon-ui/lib/configure/utils';
import { pick } from 'lodash';
import TableProfessionalBar from '../table/query-bar/TableProfessionalBar';
import { SelectionMode, TableMode, TableQueryBarType } from '../table/enum';
import { DataSetSelection } from '@buildrun/dataset/lib/data-set/enum';
import Table, { TableProps } from '../table/Table';
import { LovConfig } from './Lov';
import { ColumnProps } from '../table/Column';

export interface LovViewProps {
  dataSet: DataSet;
  tableProps?: TableProps;
  config: LovConfig & { queryBar?: TableQueryBarType | TableQueryBarHook };
  multiple: boolean;
  values: any[];
  onDoubleClick: () => void;
  onEnterDown: () => void;
}

export default class LovView extends Component<LovViewProps> {
  static propTypes = {
    dataSet: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    tableProps: PropTypes.object,
    onDoubleClick: PropTypes.func.isRequired,
    onEnterDown: PropTypes.func.isRequired,
  };

  selection: DataSetSelection | false;

  @action
  componentWillMount() {
    const {
      dataSet,
      dataSet: { selection },
      multiple,
    } = this.props;
    this.selection = selection;
    dataSet.selection = multiple ? DataSetSelection.multiple : DataSetSelection.single;
  }

  @action
  componentWillUnmount() {
    const { dataSet } = this.props;
    dataSet.selection = this.selection;
  }

  /* istanbul ignore next */
  getColumns(): ColumnProps[] | undefined {
    const {
      config: { lovItems },
    } = this.props;
    return lovItems
      ? lovItems
        .filter(({ gridField }) => gridField === 'Y')
        .sort(({ gridFieldSequence: seq1 }, { gridFieldSequence: seq2 }) => seq1 - seq2)
        .map<ColumnProps>(({ display, gridFieldName, gridFieldWidth, gridFieldAlign }) => ({
          key: gridFieldName,
          header: display,
          name: gridFieldName,
          width: gridFieldWidth,
          align: gridFieldAlign,
        }))
      : undefined;
  }

  /* istanbul ignore next */
  handleKeyDown = e => {
    if (e.keyCode === KeyCode.ENTER) {
      const { onEnterDown } = this.props;
      onEnterDown();
    }
  };

  /**
   * 单选 onRow 处理
   * @param props
   */
  handleRow = (props) => {
    const { onDoubleClick, tableProps } = this.props;
    let tablePropsOnRow;
    if (tableProps?.onRow) tablePropsOnRow = tableProps.onRow(props);
    return {
      onDoubleClick,
      ...tablePropsOnRow,
    };
  };

  getQueryBar() {
    const {
      config: { queryBar },
      tableProps,
    } = this.props;
    const lovTablePropsConf = getConfig('lovTableProps');
    if (queryBar) {
      return queryBar;
    }
    if (tableProps && tableProps.queryBar) {
      return tableProps.queryBar;
    }
    return lovTablePropsConf.queryBar;
  };

  render() {
    const {
      dataSet,
      config: { height, treeFlag, queryColumns },
      multiple,
      tableProps,
    } = this.props;
    const lovTablePropsConf = getConfig('lovTableProps');
    const lovTableProps: TableProps = {
      ...lovTablePropsConf,
      ...tableProps,
      autoFocus: true,
      mode: treeFlag === 'Y' ? TableMode.tree : TableMode.list,
      onKeyDown: this.handleKeyDown,
      dataSet,
      columns: this.getColumns(),
      queryFieldsLimit: queryColumns,
      queryBar: this.getQueryBar(),
    };

    if (multiple) {
      lovTableProps.selectionMode = SelectionMode.rowbox;
    } else {
      lovTableProps.selectionMode = tableProps?.selectionMode ? tableProps.selectionMode : SelectionMode.none;
      lovTableProps.onRow = this.handleRow;
    }

    if (height) {
      lovTableProps.style = { ...lovTableProps.style, height };
    }

    const isProfessionalBar = getConfig('queryBar') === TableQueryBarType.professionalBar;
    if (!lovTableProps.queryBar && isProfessionalBar) {
      lovTableProps.queryBar = (props) => <TableProfessionalBar {...props} queryBarProps={{ labelWidth: 80 }} />;
    }

    // 优化优先级 让 部分tableProps属性 的优先级大于dataSet的设置
    // 目前需要处理 selectionMode
    Object.assign(lovTableProps, pick({ ...lovTablePropsConf, ...tableProps }, [
      'selectionMode',
    ]));

    return <Table {...lovTableProps} />;
  }
}
