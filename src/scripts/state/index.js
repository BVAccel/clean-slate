import dom from 'common/Dom';

import { initSubscribers } from './subscribers';
import { getState, setState, clearState } from './handlers';

import { initProductContainers } from './product';
import { initLineItemContainers } from './line-item';
import { cacheCart } from './cart';

export const state = window.bvaccel.state;

const init = (data) => {
  cacheCart();

  return [...initProductContainers(data), ...initLineItemContainers(data)];
};

export default {
  initSubscribers,
  init,
  get: getState,
  set: setState,
  clear: clearState,
};
