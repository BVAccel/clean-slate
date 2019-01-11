import PubSub from 'pubsub-js';

import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

const sliderThumbClick = ({ currentTarget: self }) => {
  const { filterValue, slideIndex } = self.dataset;
  const { containerId: sliderId } = dom.getParentContainer(self).dataset;
  const { filterGroup, parentId, slider } = State.get(sliderId);
  const parentState = State.get(parentId);
  const option = parentState._data.options.find(option => option.name === filterGroup);
  const parentHasValue = option.values.includes(filterValue);

  if (parentState[filterGroup] && parentHasValue) {
    const topic = `${bva.updateOptionGroupValue}.${filterGroup.toUpperCase()}`;
    const data = { id: parentId, name: filterGroup, value: filterValue };

    PubSub.publish(topic, data);
  }

  console.log(slider);

  slider.slideTo(slideIndex);

  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.galleryThumb, sliderThumbClick);
};
