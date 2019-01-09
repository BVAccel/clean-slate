import 'slick-carousel';

import dom from 'common/Dom';
import settings from './settings';

import State from 'state';

export const slickFilter = (sliderName, filter) => {
  const $slider = $(`[data-slider="${sliderName}"]`);
  $slider.slick('slickUnfilter');
  $slider.slick('slickFilter', filter);
};

const filterSlider = (id, slider) => {
  const containerState = State.get(id);
  const sliderName = slider.dataset.slider;
  const filterGroupOption = slider.dataset.filterGroupOption;
  const filterValue = containerState[filterGroupOption];
  const filterAttr = slider.dataset.filterAttr;
  const filter = `[${filterAttr}="${filterValue}"]`;

  const optionValues = containerState._data.options.find(option => option.name === filterGroupOption).values;

  const hasValue = $(slider)
    .find(dom.productGallerySlide)
    .get()
    .some(slide => optionValues.includes($(slide).attr(filterAttr)));

  if (hasValue) {
    slickFilter(sliderName, filter);
  }
};

export const initSliders = () => {
  dom.$getContainers('slider').each((i, slider) => {
    const {
      container,
      containerId: id,
      containerName: name,
      filterGroupOption,
      hasNav,
    } = slider.dataset;

    const settingsBase = settings[name] || settings.default;

    const sliderSettings = (hasNav !== undefined)
      ? { ...settingsBase, customPaging: settings.navCustomPaging, dots: true }
      : { ...settingsBase };

    $(slider).slick(sliderSettings);
    State.set({ id, change: 'SLIDER', container, name, slider, settings: sliderSettings });

    if (filterGroupOption) {
      const id = $(slider).parent().closest(dom.container).data('container-id');
      filterSlider(id, slider);
    }
  });
};

export const updateSlides = data => {
  const { id, ...option } = data;
  const change = Object.keys(option)[0];
  const $sliders = dom.$getContainer(id).find(dom.slider);

  $sliders.each((i, slider) => {
    const sliderName = slider.dataset.slider;
    const filterGroupOption = slider.dataset.filterGroupOption;

    if (change === filterGroupOption) {
      filterSlider(id, slider);
    }
  });
};
