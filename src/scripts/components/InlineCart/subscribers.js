import bva from 'common/Constants';
import {
  openInlineCart,
  closeInlineCart,
  toggleInlineCart,
  updateInlineCartUI, } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.openInlineCart, (message, data) => {
    return openInlineCart(data);
  });

  PubSub.subscribe(bva.closeInlineCart, (message, data) => {
    return closeInlineCart(data);
  });

  PubSub.subscribe(bva.toggleInlineCart, (message, data) => {
    return toggleInlineCart(data);
  });

  PubSub.subscribe(bva.hideOverlay, (message, data) => {
    return closeInlineCart(data);
  });

  PubSub.subscribe(bva.cartRequestSuccess, (message, data) => {
    return updateInlineCartUI(data);
  });
};
