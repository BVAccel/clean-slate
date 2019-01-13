import PubSub from 'pubsub-js';

import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

const updateParentOptionValue = (parent, filterGroup, filterValue) => {
  if (!parent || !filterGroup || !filterValue) return false;
  const parentState = State.get(parent);
  const option = parentState._data.options.find(option => option.name === filterGroup);

  if (option && option.values.includes(filterValue) && parentState[filterGroup] !== filterValue) {
    const topic = `${bva.updateOptionGroupValue}.${filterGroup.toUpperCase()}`;
    const data = { id: parentState.id, name: filterGroup, value: filterValue };

    PubSub.publish(topic, data);
  }
};

const updateSiblingSlider = (navFor, index) => {
  const siblingSlider = State.get(navFor).slider;
  const siblingSliderSlides = Array.from(siblingSlider.slider.children);
  const slideTo = siblingSliderSlides.findIndex(slide => slide.dataset.slideIndex === index);

  siblingSlider.select(slideTo);
};


const handleSliderThumbClick = ({ currentTarget: self }) => {
  const { filterValue, slideIndex } = self.dataset;
  const { navFor, parent, filterGroup } = State.get(self);
  updateSiblingSlider(navFor, slideIndex);
  updateParentOptionValue(parent, filterGroup, filterValue);

  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.galleryThumb, handleSliderThumbClick);
};
