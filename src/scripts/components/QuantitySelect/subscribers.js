import bva from 'common/Constants';
import { updateQuantity } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateQuantity, (message, data) => {
    return updateQuantity(data);
  });
};
