import { getState } from '@shopify/theme-cart';

import State from 'state';

export const cacheCart = () => {
  getState().then((cart) => (window.bvaccel.cart = cart));
};

const replaceCartState = (newCart) => {
  const change = 'CART';
  const container = 'cart';

  State.clear('cart');

  State.set({ change, container, ...newCart });
};

export const updateCart = (data) => {
  const { action, requestData, responseData } = data;

  if (action === 'add') {
    getState().then((cart) => replaceCartState(cart));
  } else if (action === 'remove' || action === 'update') {
    replaceCartState(responseData);
  }
};
