import { addItem, removeItem, updateItem } from '@shopify/theme-cart';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { debounce } from 'common/Helpers';

export const addToCart = data => {
  const { id, quantity, properties } = data;
  const requestData = { id, quantity, properties };

  return addItem(id, { quantity, properties })
    .then(responseData => {
      const topic = bva.cartRequestSuccess;
      const data = { action: 'add', requestData, responseData };

      PubSub.publish(topic, data);
    })
    .catch(error => {
      const topic = bva.cartRequestError;
      const data = { error, requestData };

      PubSub.publish(topic, data);
    });
};

export const removeFromCart = data => {
  const { key } = data;
  const requestData = { key };

  return removeItem(key)
    .then(responseData => {
      const topic = bva.cartRequestSuccess;
      const data = { action: 'remove', requestData, responseData };

      PubSub.publish(topic, data);
    })
    .catch(error => {
      const topic = bva.cartRequestError;
      const data = { error, requestData };

      PubSub.publish(topic, data);
    });
};

export const updateCart = debounce(data => {
  const { key, quantity } = data;
  const requestData = { key, quantity };

  return updateItem(key, { quantity })
    .then(responseData => {
      const topic = bva.cartRequestSuccess;
      const data = { action: 'update', requestData, responseData };

      PubSub.publish(topic, data);
    })
    .catch(error => {
      const topic = bva.cartRequestError;
      const data = { error, requestData };

      PubSub.publish(topic, data);
    });
}, 300);
