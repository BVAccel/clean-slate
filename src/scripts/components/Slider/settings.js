import State from 'state';

import { loadImage, imageSize, removeProtocol } from '@shopify/theme-images';

const defaultSettings = {};

const productGallerySettings = {
  ...defaultSettings,
  autoHeight: true,
  // slideClass: 'gallery-slide',
};

const productGalleryThumbsSettings = {
  ...defaultSettings,
  slidesPerView: 'auto',
  direction: 'vertical',
  spaceBetween: 10,
  preventClicks: false,
  // slideToClickedSlide: true,
  // simulateTouch: false
  // followFinger: true,
  allowTouchMove: false,
  // slideClass: 'thumb-slide',
};

const homepageHeroSettings = {
  ...defaultSettings,
  // slidesPerView: 1,
  autoplay: true,
  // slideClass: 'oo-hero',
  loop: true,
};

export default {
  default: defaultSettings,
  ['product-gallery']: productGallerySettings,
  ['product-gallery-thumbs']: productGalleryThumbsSettings,
  ['Homepage Hero']: homepageHeroSettings,
};
