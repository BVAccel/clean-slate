import State from 'state';

import { loadImage, imageSize, removeProtocol } from '@shopify/theme-images';

const defaultSettings = {
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
};

const productGallerySettings = {
  ...defaultSettings,
  autoHeight: true,
  // preventClicks: false,
  // preventClicksPropagation: false,
  slideClass: 'gallery-slide',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // treshold: 1000,
};

const productGalleryThumbsSettings = {
  ...defaultSettings,
  slidesPerView: 'auto',
  direction: 'vertical',
  spaceBetween: 10,
  allowTouchMove: false,
  slideClass: 'thumb-slide',
  preventClicks: false,
  preventClicksPropagation: false,
  slideToClickedSlide: true,

  // touchRatio: 0.2,
  // watchOverflow: true,
  threshold: 1000,
  // followFinger: true,
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
