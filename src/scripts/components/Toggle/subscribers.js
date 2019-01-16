import bva from 'common/Constants';
import { toggle } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.toggle, (message, data) => {
    return toggle(data);
  });
};
