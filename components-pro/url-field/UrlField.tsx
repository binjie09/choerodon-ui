import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { FieldType } from '@choerodon/dataset/lib/data-set/enum';
import { ValidationMessages } from '@choerodon/dataset/lib/validator/Validator';
import { TextField, TextFieldProps } from '../text-field/TextField';
import { $l } from '../locale-context';

export interface UrlFieldProps extends TextFieldProps {}

@observer
export default class UrlField extends TextField<UrlFieldProps> {
  static displayName = 'UrlField';

  type: string = 'url';

  @computed
  get defaultValidationMessages(): ValidationMessages {
    const label = this.getProp('label');
    return {
      valueMissing: $l('UrlField', label ? 'value_missing' : 'value_missing_no_label', { label }),
      typeMismatch: $l('UrlField', 'type_mismatch'),
    };
  }

  getFieldType(): FieldType {
    return FieldType.url;
  }
}
