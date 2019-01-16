import bva from 'common/Constants';

import { updateContainerSliders, updateSliderSlide } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateOptionGroupValue, (message, data) => {
    return updateContainerSliders(data);
  });

  PubSub.subscribe(bva.updateSliderSlide, (message, data) => {
    return updateSliderSlide(data);
  });

  PubSub.subscribe(bva.updateContainerSliders, (message, data) => {
    return updateContainerSliders(data);
  });
};
