import message from '../message';
import exception from '../_util/exception';
import { $l } from '../locale-context';

export { FeedBack } from '@buildrun/dataset/lib/data-set/FeedBack';

const defaultFeedback = {
  loadSuccess(_result: any) {},
  loadFailed(error) {
    message.error(exception(error, $l('DataSet', 'query_failure')));
  },
  submitSuccess(_result: any) {
    message.success($l('DataSet', 'submit_success'));
  },
  submitFailed(error) {
    message.error(exception(error, $l('DataSet', 'submit_failure')));
  },
};

export default defaultFeedback;
