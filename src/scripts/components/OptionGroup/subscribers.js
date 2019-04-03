import PubSub from 'pubsub-js';

import bva from 'common/Constants';
import { updateOptionGroupSelectedText } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateOptionGroupValue, (message, data) => {
    return updateOptionGroupSelectedText(data);
  });
};
