import dom from 'common/Dom';
import bva from 'common/Constants';
import { addToCart, removeFromCart, updateCart } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.addToCart, (message, data) => {
    return addToCart(data);
  });

  PubSub.subscribe(bva.removeFromCart, (message, data) => {
    return removeFromCart(data);
  });

  PubSub.subscribe(bva.updateLineItemQuantity, (message, data) => {
    return updateCart(data);
  });
};
