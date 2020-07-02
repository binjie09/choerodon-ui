import React from 'react';
import { runInAction } from 'mobx';
import { configure as configureDataSet } from '@buildrun/dataset';
import defaultFeedback from 'choerodon-ui/pro/lib/data-set/FeedBack';
import confirm from 'choerodon-ui/pro/lib/modal/confirm';
import getReactNodeText from 'choerodon-ui/pro/lib/_util/getReactNodeText';
import { formatReactTemplate } from 'choerodon-ui/pro/lib/formatter';
import globalConfig, { Config, ConfigKeys } from './config';

export { Formatter, Status } from '@buildrun/dataset/lib/configure';

configureDataSet({
  feedback: defaultFeedback,
  confirm: async (message) => (await confirm(message)) !== 'cancel',
  validationMessageReportFormatter: (message) => getReactNodeText(<span>{message}</span>),
  validationMessageFormatter: (message, injectOptions) => message && injectOptions ? formatReactTemplate(message, injectOptions) : message,
});

export default function configure(config: Config) {
  runInAction(() => {
    configureDataSet(config);
    Object.keys(config).forEach((key: ConfigKeys) => {
      globalConfig.set(key, config[key]);
    });
  });
}
