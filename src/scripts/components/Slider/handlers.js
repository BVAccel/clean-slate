import Swiper from 'swiper';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { unique } from 'common/Helpers';

import settings from './settings';

import State from 'state';

const filterSlider = swiper => {
  const sliderState= State.get(swiper.el.dataset.containerId);

  if (!sliderState.isFilterable) return;

  const parentState = State.get(sliderState.parentId);
  const filterValue = parentState[sliderState.filterGroup];
  const newSlides = sliderState.slides.filter(slide => slide.dataset.filterValue == filterValue);

  swiper.removeAllSlides();
  swiper.addSlide(0, newSlides);
};

const checkiFFilterable = (slider, option) => {
  const { filterAttr } = slider.el.dataset;
  const possibleFilterValues = Array.from(slider.slides).map(slide => $(slide).attr(filterAttr));
  const uniquePossibleFilterValues = unique(possibleFilterValues);

  const everyValuePresent = option.values.every(value => uniquePossibleFilterValues.includes(value));
  const everyValueAtLeastTwice = option.values.every(value => {
    const occurances = possibleFilterValues.reduce((count, possibleValue) => (possibleValue === value) ? count + 1 : count, 0);
    return occurances >= 2;
  });

  return everyValuePresent && everyValueAtLeastTwice;
};

const getOption = (parentState, filterGroup) => {
  return parentState._data.options.find(option => option.name === filterGroup);
};

const getFilterGroup = (parentState, filterGroupOptions) => {
  const parentOptionNames = parentState._data.options.map(option => option.name);
  return filterGroupOptions
    .split('|')
    .find(option => parentOptionNames.includes(option));
};

const initSlider = (slider, sliderSettings) => {
  const { hasNav } = slider.dataset;
  const parentContainer = dom.getParentContainer(slider);

  if (!parentContainer) {
    const swiper = new Swiper(slider, sliderSettings);
    return { swiper, parentContainer };
  }

  if (hasNav) {
    const sliders = State.get('slider');
    const navSlider = Object.values(sliders).find(slider => slider.name === hasNav).slider;
    sliderSettings.thumbs = { swiper: navSlider };
  }

  const swiper = new Swiper(slider, sliderSettings);
  return { swiper, parentContainer };
};

export const initSliders = () => {
  const promises = dom.getContainers('slider').map(slider => {
    const { containerId: id, container, filterGroupOptions, containerName: name } = slider.dataset;
    const sliderSettings = settings[name] || settings.default;
    const { swiper, parentContainer } = initSlider(slider, sliderSettings);
    const parentId = (parentContainer) ? parentContainer.dataset.containerId : undefined;
    const slides = [ ...Array.from(swiper.slides) ];
    let isFilterable = false;
    let filterGroup;

    if (filterGroupOptions) {
      const parentState = State.get(parentId);
      filterGroup = getFilterGroup(parentState, filterGroupOptions);
      const option = getOption(parentState, filterGroup);
      isFilterable = checkiFFilterable(swiper, option)

      if (filterGroup && option && isFilterable) {
        const parentContainerType = parentContainer.dataset.container;
        const filterGroupStateName = filterGroup.replace(' ', '_').toUpperCase();
        const topic = `${bva.updateState}.${parentContainerType.toUpperCase()}.${filterGroupStateName}`;

        PubSub.subscribe(topic, (message, data) => {
          if (data.id === parentId) {
            filterSlider(swiper);
          }
        });
      }
    }

    State.set({ id, change: 'slider', container, name, slider: swiper, slides, filterGroup, parentId, isFilterable});

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
