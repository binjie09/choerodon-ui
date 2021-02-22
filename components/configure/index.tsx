import React from 'react';
import { configure as configureDataSet } from '@choerodon/dataset';
import defaultFeedback from 'choerodon-ui/pro/lib/data-set/FeedBack';
import confirm from 'choerodon-ui/pro/lib/modal/confirm';
import getReactNodeText from 'choerodon-ui/pro/lib/_util/getReactNodeText';
import { formatReactTemplate } from 'choerodon-ui/pro/lib/formatter';
import { Config } from './config';
import defaults from './default';

export { Formatter, Status } from '@choerodon/dataset/lib/configure';

//@ts-ignore
configureDataSet<Config>({
  feedback: defaultFeedback,
  confirm: async (message) => (await confirm(message)) !== 'cancel',
  validationMessageReportFormatter: (message) => getReactNodeText(<span>{message}</span>),
  validationMessageFormatter: (message, injectOptions) => message && injectOptions ? formatReactTemplate(message, injectOptions) : message,
  ...defaults,
});

export default function configure(config: Config) {
  // @ts-ignore
  configureDataSet<Config>(config);
}
