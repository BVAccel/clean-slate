import State from 'state';

import { loadImage, imageSize, removeProtocol } from '@shopify/theme-images';

const defaultSettings = {
  // adaptiveHeight: true,
};

const productGalleryThumbsSettings = {
  ...defaultSettings,
  init: false,
  contain: true,
  pageDots: false,
  prevNextButtons: false,
  groupCells: true,
};

const productGallerySettings = {
  ...defaultSettings,
  pageDots: false,
  lazyLoad: true,
  imagesLoaded: true,
  // setGallerySize: false,
};

const homepageHeroSettings = {
  ...defaultSettings,
  adaptiveHeight: true,
  autoplay: true,
  wrapAround: true,
  lazyLoad: true,
  imagesLoaded: true,
};

export default {
  default: defaultSettings,
  ['Product Gallery']: productGallerySettings,
  ['Product Gallery Thumbs']: productGalleryThumbsSettings,
  ['Homepage Hero']: homepageHeroSettings,
};
