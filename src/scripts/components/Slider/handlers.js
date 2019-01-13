import Flickity from 'flickity';
import 'flickity-as-nav-for';
import 'flickity-imagesloaded';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { unique } from 'common/Helpers';

import settings from './settings';

import State from 'state';

const filterSlider = id => {
  const sliderState = State.get(id);
  if (!sliderState.isFilterable) return;
  const parentState = State.get(sliderState.parent);
  const filterValue = parentState[sliderState.filterGroup];
  const newSlides = sliderState.slides.filter(slide => slide.dataset.filterValue === filterValue);
  const allSlides = [ ...sliderState.slides ];

  if (sliderState.slider.constructor.name === 'Flickity') {
    sliderState.slider.remove(allSlides);
    sliderState.slider.append(newSlides);
    sliderState.slider.select(0);
  } else {
    $(sliderState.element).empty();
    $(sliderState.element).html(newSlides);
  }
};

const checkiFFilterable = (sliderState, option) => {
  if (!option) return false;
  const filterAttr = sliderState.element.dataset.filterAttr;
  const possibleFilterValues = sliderState.slides.map(slide => $(slide).attr(filterAttr));
  const uniquePossibleFilterValues = unique(possibleFilterValues);
  const everyValuePresent = option.values.every(value => uniquePossibleFilterValues.includes(value));

  const everyValueAtLeastTwice = option.values.every(value => {
    const occurances = possibleFilterValues.reduce((count, possibleValue) => {
      return (possibleValue === value) ? count + 1 : count;
    }, 0);
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

const initSlider = sliderContainer => {
  sliderContainer.element = sliderContainer;
  const { containerId: id, container, containerName: name, navFor } = sliderContainer.dataset;
  const slides = [ ...Array.from(sliderContainer.children) ];
  const sliderSettings = settings[name] || settings.default;

  if (slides.length === 1) {
    sliderSettings.pageDots = false;
    sliderSettings.prevNextButtons = false;
  }

  const slider = (sliderSettings.init === false)
    ? sliderContainer
    : new Flickity(sliderContainer, sliderSettings);

  return State.set({
    id, container, change: 'slider',
    element: sliderContainer,
    name,
    slider,
    slides,
    navFor: dom.getContainer(navFor),
  });
};

const initFiltering = sliderState => {
  const { filterGroupOptions, container } = sliderState.element.dataset;
  const parentContainer = dom.getParentContainer(sliderState.element);
  const parentState = State.get(parentContainer);
  const filterGroup = getFilterGroup(parentState, filterGroupOptions);
  const option = getOption(parentState, filterGroup);
  const isFilterable = checkiFFilterable(sliderState, option);

  if (isFilterable) {
    const parentType = parentContainer.dataset.container.toUpperCase();
    const changeType = filterGroup.replace(' ', '_').toUpperCase();
    const topic = `${bva.updateState}.${parentType}.${changeType}`;

    PubSub.subscribe(topic, (message, data) => {
      if (data.id === parentState.id) {
        filterSlider(sliderState.id);
      }
    });
  }

  return State.set({
    id: sliderState.id,
    container,
    change: 'slider',
    parent: parentContainer,
    filterGroup,
    isFilterable,
  });
};

export const initSliders = () => {
  const promises = dom.getContainers('slider').map(sliderContainer => {
    const slider = initSlider(sliderContainer);
    const withFiltering = initFiltering(slider);

    return Promise.resolve(withFiltering);
  });

  return Promise.all(promises);
};

export const filterSlides = () => {
  const promises = Object.values(State.get('slider'))
    .filter(slider => slider.isFilterable)
    .map(slider => filterSlider(slider.id));

  return Promise.all(promises);
};
