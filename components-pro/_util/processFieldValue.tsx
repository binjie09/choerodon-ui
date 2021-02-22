import { Field, NumberUtils } from '@choerodon/dataset';
import { Lang } from '@choerodon/dataset/lib/locale-context/enum';
import { FieldType } from '@choerodon/dataset/lib/data-set/enum';
import formatNumber from '../formatter/formatNumber';
import formatCurrency from '../formatter/formatCurrency';

export default function processFieldValue(value, field: Field, lang: Lang, showValueIfNotFound?: boolean) {
  const { type } = field;
  if (type === FieldType.number) {
    const precision = NumberUtils.getPrecision(value || 0);
    const options = {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    };
    return formatNumber(value, lang, options);
  }
  if (type === FieldType.currency) {
    return formatCurrency(value, lang, {
      currency: field.get('currency'),
    });
  }
  return field.getText(value, showValueIfNotFound);
}
