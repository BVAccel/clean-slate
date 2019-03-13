import bva from 'common/Constants';

import { updateModal } from './modal';
import { updateCart } from './cart';

import {
  updateProductQuantity,
  updateOptionGroupValue,
  updateVariant,
  updateInventory,
  updatePrice,
} from './product';

import { initLineItemContainers, updateLineItemQuantity } from './line-item';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateInlineCartUI, (message, data) => {
    return initLineItemContainers(data);
  });

  PubSub.subscribe(bva.updateProductQuantity, (message, data) => {
    return updateProductQuantity(data);
  });

  PubSub.subscribe(bva.updateLineItemQuantity, (message, data) => {
    return updateLineItemQuantity(data);
  });

  PubSub.subscribe(bva.updateOptionGroupValue, (message, data) => {
    return updateOptionGroupValue(data);
  });

  PubSub.subscribe(bva.updateVariant, (message, data) => {
    return updateVariant(data);
  });

  PubSub.subscribe(bva.updateInventory, (message, data) => {
    return updateInventory(data);
  });

  PubSub.subscribe(bva.updatePrice, (message, data) => {
    return updatePrice(data);
  });

  PubSub.subscribe(bva.showModal, (message, data) => {
    return updateModal(data);
  });

  PubSub.subscribe(bva.hideModal, (message, data) => {
    return updateModal(data);
  });

  PubSub.subscribe(bva.cartRequestSuccess, (message, data) => {
    return updateCart(data);
  });
};
