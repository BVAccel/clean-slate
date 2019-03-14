import bva from 'common/Constants';
import { showOverlay, hideOverlay, toggleOverlay } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.showOverlay, (message, data) => {
    return showOverlay(data);
  });

  PubSub.subscribe(bva.hideOverlay, (message, data) => {
    return hideOverlay(data);
  });

  PubSub.subscribe(bva.toggleOverlay, (message, data) => {
    return toggleOverlay(data);
  });
};
