import Swiper from 'swiper';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { unique } from 'common/Helpers';

import settings from './settings';

import State from 'state';

const filterSlider = swiper => {
  const sliderState= State.get(swiper.el.dataset.containerId);
  const parentState = State.get(sliderState.parentId);
  const filterValue = parentState[sliderState.filterGroup];
  const newSlides = sliderState.slides.filter(slide => slide.dataset.filterValue == filterValue);

  swiper.removeAllSlides();
  swiper.addSlide(0, newSlides);
};

const getFilterGroupAndOption = (parentId, filterGroupOptions) => {
  const parentOptions = State.get(parentId)._data.options;
  const parentOptionNames = parentOptions.map(option => option.name);
  const filterGroup = filterGroupOptions
    .split('|')
    .find(option => parentOptionNames.includes(option));
  const option = parentOptions.find(option => option.name === filterGroup);

  return { filterGroup, option };
};

const checkIfFilterable = (swiper, option) => {
  const { filterAttr } = swiper.el.dataset;
  const possibleFilterValues = unique(Array.from(swiper.slides).map(slide => $(slide).attr(filterAttr)));

  return option.values.every(value => possibleFilterValues.includes(value));
};

export const initSliders = () => {
  dom.$getContainers('slider').each((i, slider) => {
    const { container, filterGroupOptions, containerId, containerName, hasNav, navFor } = slider.dataset;
    const { containerId: parentId, container: type } = dom.getParentContainer(slider).dataset;

    let sliderSettings = settings[containerName] || settings.default;;
    let isFilterable = false;
    let filterGroup;
    let option;

    if (hasNav) {
      const sliders = State.get('slider');
      const navSlider = Object.values(sliders).find(slider => slider.name === hasNav).slider;
      sliderSettings.thumbs = { swiper: navSlider };
    }

    const swiper = new Swiper(slider, sliderSettings);

    if (filterGroupOptions) {

      const filterOptions = getFilterGroupAndOption(parentId, filterGroupOptions);
      filterGroup = filterOptions.filterGroup;
      option = filterOptions.option;

      if (filterGroup && option) {

        isFilterable = checkIfFilterable(swiper, option);

        if (isFilterable) {

          const normalizedFilterGroupStateName = filterGroup.replace(' ', '_').toUpperCase();
          const topic = `${bva.updateState}.${type.toUpperCase()}.${normalizedFilterGroupStateName}`;

          PubSub.subscribe(topic, (message, data) => {
            if (data.id === parentId) {
              filterSlider(swiper);
            }
          });

        }
      }
    }

    const oldState = { id: containerId, change: 'slider', container };
    const newState = { name: containerName, slider: swiper, slides: [ ...Array.from(swiper.slides) ], filterGroup, isFilterable, parentId };
    State.set({ ...oldState, ...newState });

    if (isFilterable) {
      filterSlider(swiper);
    }
  });
};


