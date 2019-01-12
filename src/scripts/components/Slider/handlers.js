import Flickity from 'flickity';
import 'flickity-as-nav-for';
import 'flickity-imagesloaded';
// import 'flickity-fullscreen';
// import 'flickity-hash';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { unique } from 'common/Helpers';

import settings from './settings';

import State from 'state';

const filterSlider = slider => {
  const sliderState = State.get(slider.element);
  const parentState = State.get(sliderState.parent.id);
  if (!sliderState.isFilterable) return;
  const filterValue = parentState[sliderState.filterGroup];
  const newSlides = sliderState.slides.filter(slide => slide.dataset.filterValue == filterValue);
  const allSlides = [ ...sliderState.slides ];

  if (sliderState.slider.constructor.name === 'Flickity') {
    sliderState.slider.remove(sliderState.slides);
    sliderState.slider.append(newSlides);
    sliderState.slider.select(0);
  } else {
    $(slider).empty();
    $(slider).html(newSlides);
  }
};

const checkiFFilterable = (slider, option) => {
  const { slides, filterAttr } = State.get(slider.element);
  const possibleFilterValues = slides.map(slide => $(slide).attr(filterAttr));
  const uniquePossibleFilterValues = unique(possibleFilterValues);

  const everyValuePresent = option.values.every(value => uniquePossibleFilterValues.includes(value));
  const everyValueAtLeastTwice = option.values.every(value => {
    const occurances = possibleFilterValues.reduce((count, possibleValue) => (possibleValue === value) ? count + 1 : count, 0);
    return occurances >= 2;
  });

  return everyValuePresent && everyValueAtLeastTwice;
};

const getOption = (parentState, filterGroup) => {
  if (!parentState || !filterGroup) return;
  return parentState._data.options.find(option => option.name === filterGroup);
};

const getFilterGroup = (parentState, filterGroupOptions) => {
  if (!filterGroupOptions) return;
  const parentOptionNames = parentState._data.options.map(option => option.name);
  return filterGroupOptions
    .split('|')
    .find(option => parentOptionNames.includes(option));
};

const initSlider = (slider, sliderSettings) => {
  if (sliderSettings.init == false) {
    slider.element = slider;
    return slider;
  }

  return new Flickity(slider, sliderSettings);
};

export const initSliders = () => {
  const promises = dom.getContainers('slider').map(slider => {
    const { containerId: id, container, filterGroupOptions, containerName: name, filterAttr, navFor } = slider.dataset;
    const slides = [ ...Array.from(slider.children) ];

    State.set({ id, container, change: 'slider', name, slides, filterAttr, navFor: dom.getContainer(navFor) });

    const sliderSettings = settings[name] || settings.default;
    const flickity = initSlider(slider, sliderSettings);

    State.set({ id, container, change: 'slider', slider: flickity });

    const parentContainer = dom.getParentContainer(slider);
    const parent = State.get(parentContainer);
    const filterGroup = getFilterGroup(parent, filterGroupOptions);
    const option = getOption(parent, filterGroup);
    const isFilterable = checkiFFilterable(flickity, option);

    State.set({ id, container, change: 'slider', parent, filterGroup, isFilterable });

    if (isFilterable) {
      const parentType = parentContainer.dataset.container.toUpperCase();
      const changeType = filterGroup.replace(' ', '_').toUpperCase();
      const topic = `${bva.updateState}.${parentType}.${changeType}`;

      PubSub.subscribe(topic, (message, data) => {
        if (data.id === parent.id) {
          filterSlider(flickity);
        }
      });
    }
    return Promise.resolve();
  });

  return Promise.all(promises);
};

export const filterSliders = () => {
  const promises = Object.values(State.get('slider'))
    .map(sliderState => sliderState.slider)
    .map(slider => filterSlider(slider));

  return Promise.all(promises);
};
