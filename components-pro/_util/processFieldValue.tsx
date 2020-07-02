import { Field } from '@buildrun/dataset';
import { Lang } from '@buildrun/dataset/lib/locale-context/enum';
import { FieldType } from '@buildrun/dataset/lib/data-set/enum';
import { getPrecision } from '@buildrun/dataset/lib/number-utils';
import formatNumber from '../formatter/formatNumber';
import formatCurrency from '../formatter/formatCurrency';

export default function processFieldValue(value, field: Field, lang: Lang, showValueIfNotFound?: boolean) {
  const { type } = field;
  if (type === FieldType.number) {
    const precision = getPrecision(value || 0);
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
