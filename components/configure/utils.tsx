import { getConfig as getDataSetConfig } from '@buildrun/dataset';
import { Config, ConfigKeys } from './config';
import defaults from './default';

export function getConfig(key: ConfigKeys): any {
  const config = getDataSetConfig<Config>(key);
  if (config === undefined) {
    return defaults[key];
  }
  return config;
}

export function getPrefixCls(suffixCls: string, customizePrefixCls?: string): string {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return `${getConfig('prefixCls')}-${suffixCls}`;
}

export function getProPrefixCls(suffixCls: string, customizePrefixCls?: string): string {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return `${getConfig('proPrefixCls')}-${suffixCls}`;
}
