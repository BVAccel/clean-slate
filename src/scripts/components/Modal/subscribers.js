import bva from 'common/Constants';

import { showModal, hideModal } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.showModal, (message, data) => {
    return showModal(data);
  });

  PubSub.subscribe(bva.hideModal, (message, data) => {
    return hideModal(data);
  });

  PubSub.subscribe(bva.hideOverlay, (message, data) => {
    return hideModal(data);
  });
};
