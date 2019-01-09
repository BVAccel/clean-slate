import dom from 'common/Dom';
import bva from 'common/Constants';
import { setSearchParm } from 'common/Helpers';

import { state } from 'state';

export const getState = key => {
  const { cart, ...states } = state;
  const ids = Object.entries(states).reduce((allState, [name, values]) => ({ ...allState, ...values }), {});

  if (state[key]) {
    return state[key];
  } else if (ids[key]) {
    return ids[key];
  } else {
    return state
  }
};

export const setState = data => {
  const { id, change, container, ...stateChange } = data;
  let newState;

  if (id && container) {
    const oldState = state[container][id];
    newState = { ...oldState, ...stateChange };
    state[container][id] = newState;
  } else if (container) {
    const oldState = state[container];
    newState = { ...oldState, ...stateChange };
    state[container] = newState;
  }

  PubSub.publish(`${bva.updateState}.${change}`, { id, data, state: newState });

  return newState;
};

export const clearState = key => {
  const { cart, ...states } = state;
  const [group] = Object.entries(states).find(([name, values]) => Object.keys(values).includes(key)) || [];

  if (state[key]) {
    state[key] = {};
  } else if (group !== undefined) {
    delete state[group][key];
  }

  return state;
};
