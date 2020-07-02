/* eslint-disable camelcase */
import { Lang } from '@buildrun/dataset/lib/locale-context/enum';
import { Locale as DataSetLocale } from '@buildrun/dataset/lib/locale-context/locale';
import zh_CN from './zh_CN';

export interface Locale extends DataSetLocale {
  lang: Lang;
  Table: {
    show_cached_seletion;
    hide_cached_seletion;
    edit_button;
    create_button;
    save_button;
    cancel_button;
    delete_button;
    remove_button;
    reset_button;
    query_button;
    expand_button;
    collapse_button;
    export_button;
    more_button;
    advanced_search;
    dirty_info;
    restore;
    empty_data;
    choose_export_columns;
    column_name;
    filter_bar_placeholder;
    advanced_query;
    advanced_query_conditions;
    max_export;
    more;
    enter_text_filter;
    clear_filter;
    save_filter;
    collapse;
    predefined_fields;
    add_filter;
    enter_search_content;
    save_as;
    fast_filter;
    rename;
    set_default;
    cancel_default;
    filter_rename;
    save_filter_as;
    whether_delete_filter;
    filter_name;
    please_enter;
    query_option_yes;
    query_option_no;
  };
  Pagination: {
    page;
    jump_to;
    jump_to_confirm;
    records_per_page;
  };
  Upload: {
    file_selection;
    click_to_upload;
    upload_success;
    upload_failure;
    no_file;
    upload_path_unset;
    been_uploaded;
    not_acceptable_prompt;
    file_list_max_length;
  };
  Modal: {
    ok;
    cancel;
  };
  DatePicker: {
    value_missing;
    value_missing_no_label;
    type_mismatch;
    ok;
    today;
    now;
    this_week;
  };
  EmailField: {
    value_missing;
    value_missing_no_label;
    type_mismatch;
  };
  IntlField: {
    modal_title;
  };
  NumberField: {
    value_missing;
    value_missing_no_label;
  };
  Radio: {
    value_missing;
    value_missing_no_label;
  };
  SelectBox: {
    value_missing;
    value_missing_no_label;
  };
  Select: {
    value_missing;
    value_missing_no_label;
    no_matching_results;
    select_all;
    select_re;
    unselect_all;
    common_item;
  };
  Lov: {
    choose;
  };
  Transfer: {
    items;
  };
  UrlField: {
    value_missing;
    value_missing_no_label;
    type_mismatch;
  };
  ColorPicker: {
    value_missing;
    value_missing_no_label;
    type_mismatch;
  };
  Icon: {
    icons;
    whatsNew;
    direction;
    suggestion;
    edit;
    data;
    other;
    series;
  };
  Cascader:{
    please_select;
    value_missing_no_label;
    value_missing;
    select_all;
    unselect_all;
  };
  Screening:{
    selected;
    pack_up;
    more;
    multi_select;
    confirm;
    cancel;
  }
}

export default zh_CN;
