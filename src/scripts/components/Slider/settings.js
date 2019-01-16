import State from 'state';

import { loadImage, imageSize, removeProtocol } from '@shopify/theme-images';

const defaultSettings = {
  pageDots: false,
  contain: true,
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
};

const homepageHeroSettings = {
  ...defaultSettings,
  adaptiveHeight: true,
  autoPlay: true,
  wrapAround: true,
  lazyLoad: true,
};

const additionalProductImages = {
  ...defaultSettings,
  pageDots: false,
  cellAlign: 'left',
  prevNextButtons: true,
  mq: {
    'screen and (max-width: 480px)': {
      draggable: true,
      prevNextButtons: false,
    }
  }
};

export default {
  default: defaultSettings,
  ['Product Gallery']: productGallerySettings,
  ['Product Gallery Thumbs']: productGalleryThumbsSettings,
  ['Additional Product Images']: additionalProductImages,
  ['Homepage Hero']: homepageHeroSettings,
};
