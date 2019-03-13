import PubSub from 'pubsub-js';

import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

const updateParentOptionValue = (parent, filterGroup, filterValue) => {
  if (!parent || !filterGroup || !filterValue) return false;
  const parentState = State.get(parent);
  const option = parentState._data.options.find(
    (option) => option.name === filterGroup,
  );

  if (
    option &&
    option.values.includes(filterValue) &&
    parentState[filterGroup] !== filterValue
  ) {
    const topic = `${bva.updateOptionGroupValue}.${filterGroup.toUpperCase()}`;
    const data = { id: parentState.id, name: filterGroup, value: filterValue };

    PubSub.publish(topic, data);
  }
};

export const updateContainerSliders = (container, index) => {
  const id = container.dataset.containerId;
  const name = 'slide-index';
  const value = index;

  const topic = bva.updateContainerSliders;
  const data = { id, name, value };

  PubSub.publish(topic, data);
};

const handleSliderThumbClick = ({ currentTarget: self }) => {
  const { filterValue, slideIndex } = self.dataset;
  const { navFor, parent, filterGroup } = State.get(self);
  updateContainerSliders(parent, slideIndex);
  updateParentOptionValue(parent, filterGroup, filterValue);

  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.galleryThumb, handleSliderThumbClick);
};
