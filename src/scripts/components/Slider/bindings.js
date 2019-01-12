import PubSub from 'pubsub-js';

import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

const sliderThumbClick = ({ currentTarget: self }) => {
  const { filterValue, slideIndex } = self.dataset;
  const { parent, navFor, filterGroup } = State.get(self);
  const option = parent._data.options.find(option => option.name === filterGroup) || [];
  const parentHasValue = option.values.includes(filterValue);

  if (parent[filterGroup] && parentHasValue) {
    const topic = `${bva.updateOptionGroupValue}.${filterGroup.toUpperCase()}`;
    const data = { id: parent.id, name: filterGroup, value: filterValue };

    PubSub.publish(topic, data);
  }

  State.get(navFor).slider.select(slideIndex);

  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.galleryThumb, sliderThumbClick);
};
