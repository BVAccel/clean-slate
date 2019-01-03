import { loadImage, imageSize, removeProtocol } from '@shopify/theme-images';

export const navCustomPaging = (slider, index) => {
  const $slide = $(slider.$slides[index]);
  const imgSrc = $slide[0].src;

  const thumbSrc = removeProtocol(imgSrc.replace(imageSize(imgSrc), '100x'));
  loadImage(thumbSrc);

  const $thumb = $('<img />', { src: thumbSrc, alt: '' });
  return $('<button />', { type: 'button', name: '', 'data-index': index, html: $thumb });
};

const defaultSettings = {
  rows: 0,
};

const productImageGallerySettings = {
  ...defaultSettings,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const homepageHeroSettings = {
  ...defaultSettings,
  arrows: false,
  autoplay: true,
}

export default {
  navCustomPaging,
  default: defaultSettings,
  ['product-gallery']: productImageGallerySettings,
  ['homepage-hero']: homepageHeroSettings,
};
