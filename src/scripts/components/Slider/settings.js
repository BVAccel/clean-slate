import State from 'state';

import { loadImage, imageSize, removeProtocol } from '@shopify/theme-images';

const defaultSettings = {
  // rows: 0,
};

// export const navCustomPaging = (slider, index) => {
//   const sliderId = slider.$slider[0].dataset.containerId;
//   const { filterGroupOption } = State.get(sliderId);

//   const slide = slider.$slides[index];
//   const imgSrc = slide.src;
//   const filterValue = slide.dataset.filterValue;
//   const thumbSrc = removeProtocol(imgSrc.replace(imageSize(imgSrc), '100x'));

//   loadImage(thumbSrc);

//   const imgOptions = {
//     src: thumbSrc,
//     alt: slide.alt,
//     'data-filter-value': filterValue,
//     'data-filter-group': filterGroupOption,
//   };

//   const $thumb = $('<img />', imgOptions);
//   const $button = $('<button />', { type: 'button', name: '', 'data-index': index, html: $thumb });
//   return $button;
// };

const productGallerySettings = {
  ...defaultSettings,
  // slidesToShow: 1,
  // slidesToScroll: 1,
  // arrows: false,
  autoHeight: true,
};

const productGalleryThumbsSettings = {
  ...defaultSettings,
  // slidesToShow: 1,
  // slidesToScroll: 1,
  // arrows: false,
  slidesPerView: 'auto',
  direction: 'vertical',
  // width: 90,
  spaceBetween: 10,
  preventClicks: false,
  // slideToClickedSlide: true,
  // simulateTouch: false
  // followFinger: true,
  allowTouchMove: false,
  slideClass: 'thumb-slide',
};

const homepageHeroSettings = {
  ...defaultSettings,
  // arrows: false,
  // autoplay: true,
};

export default {
  // navCustomPaging,
  default: defaultSettings,
  ['product-gallery']: productGallerySettings,
  ['product-gallery-thumbs']: productGalleryThumbsSettings,
  ['homepage-hero']: homepageHeroSettings,
};
