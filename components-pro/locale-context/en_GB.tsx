import enGB from '@choerodon/dataset/lib/locale-context/en_GB';
import { Locale } from './locale';

const locale: Locale = {
  ...enGB,
  Table: {
    show_cached_seletion: 'Show all selected records',
    hide_cached_seletion: 'Hide all selected records',
    edit_button: 'Edit',
    create_button: 'Create',
    save_button: 'Save',
    cancel_button: 'Cancel',
    delete_button: 'Delete',
    remove_button: 'Remove',
    reset_button: 'Reset',
    query_button: 'Query',
    expand_button: 'Expand',
    collapse_button: 'Collapse',
    export_button: 'Export',
    more_button: 'Others',
    advanced_search: 'Advanced Search',
    dirty_info: 'Display condition has changed.',
    restore: 'Restore',
    empty_data: 'No data',
    choose_export_columns: 'Please select the column to export',
    column_name: 'Column Name',
    filter_bar_placeholder: 'Table Filter',
    advanced_query: 'Advanced Query',
    advanced_query_conditions: 'Advanced Queries',
    max_export:'Maximum Export Quantity',
    more: 'More',
    enter_text_filter: 'Enter text to filter',
    clear_filter: 'Clear filter',
    save_filter: 'Save filter',
    collapse: 'Collapse',
    predefined_fields: 'Predefined fields',
    add_filter: 'Add filter',
    enter_search_content: 'Enter search content',
    save_as: 'Save as',
    fast_filter: 'Fast filter',
    rename: 'Rename',
    set_default: 'Set as Default',
    cancel_default: 'Cancel default',
    filter_rename: 'Filter rename',
    save_filter_as: 'Save filter as',
    whether_delete_filter: 'Whether to delete the filter record',
    filter_name: 'Filter name',
    please_enter: 'Please enter',
    query_option_yes: 'Yes',
    query_option_no: 'No',
  },
  Pagination: {
    page: 'Page',
    jump_to: 'Jump to',
    jump_to_confirm: 'Confirm',
    records_per_page: 'Number of items per page：',
  },
  Upload: {
    file_selection: 'Select File',
    click_to_upload: 'Click to Upload',
    upload_success: 'Upload successfully',
    upload_failure: 'Fail to upload',
    no_file: 'No File',
    been_uploaded: 'File uploaded',
    upload_path_unset: 'Upload path unset',
    not_acceptable_prompt: 'Upload List contains unacceptable file, accept:',
    file_list_max_length: 'Number of files exceeded the maximum',
  },
  Modal: {
    ok: 'OK',
    cancel: 'Cancel',
  },
  DatePicker: {
    value_missing_no_label: 'Please choose a date.',
    value_missing: 'Please select {label}.',
    type_mismatch: 'Please enter a valid date.',
    ok: 'OK',
    today: 'Today',
    now: 'Now',
    this_week: 'This week',
  },
  EmailField: {
    value_missing_no_label: 'Please input an email address.',
    value_missing: 'Please input {label}.',
    type_mismatch: 'Please input a valid email address.',
  },
  IntlField: {
    modal_title: 'Input multi-language information.',
  },
  NumberField: {
    value_missing_no_label: 'Please input a number.',
    value_missing: 'Please input {label}.',
  },
  Radio: {
    value_missing_no_label: 'Please make a choice.',
    value_missing: 'Please select {label}.',
  },
  SelectBox: {
    value_missing_no_label: 'Please make a choice.',
    value_missing: 'Please select {label}.',
  },
  Select: {
    value_missing_no_label: 'Please make a choice.',
    value_missing: 'Please select {label}.',
    no_matching_results: 'No matching results.',
    select_all: 'Select All',
    select_re: 'Re Select',
    unselect_all: 'None',
    common_item: 'Common Items',
  },
  Lov: {
    choose: 'Choose',
  },
  Transfer: {
    items: 'items',
  },
  UrlField: {
    value_missing_no_label: 'Please input a url address.',
    value_missing: 'Please input {label}.',
    type_mismatch: 'Please input a valid url address.',
  },
  ColorPicker: {
    value_missing_no_label: 'Please select a color.',
    value_missing: 'Please select {label}.',
    type_mismatch: 'Please select a valid color.',
  },
  Icon: {
    icons: ' Icons',
    whatsNew: 'New',
    direction: 'Directional',
    suggestion: 'Suggested',
    edit: 'Editor',
    data: 'Data',
    other: 'Application',
    series: 'Series',
  },
  Cascader: {
    please_select: 'Please select',
    value_missing_no_label: 'Please make a choice.',
    value_missing: 'Please select {label}.',
    select_all: 'Select All',
    unselect_all: 'None',
  },
  Screening:{
    selected:'Selected',
    pack_up:'Pack up',
    more:'More',
    multi_select:'Multi-select',
    confirm:'Confirm',
    cancel:'Cancel',
  },
};

export default locale;
