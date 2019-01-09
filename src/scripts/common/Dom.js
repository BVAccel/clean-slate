/*

  Declare and export all DOM strings here

  e.g.

  export default {
    inlineCart: '[data-inline-cart]',
    inlineCartContents: '[data-inline-cart-contents]',
  };

  Usage:

  import dom from 'common/Dom';
  import { getCartContents } from './handlers';

  $(dom.inlineCartContents).html(getCartContents());

*/
const dom = {
  getContainer: key => {
    return (key instanceof Element)
      ? $(key).closest(dom.container)[0]
      : $(`[data-container-id="${key}"]`)[0]
  },

  $getContainer: key => {
    return (key instanceof Element)
      ? $(key).closest(dom.container)
      : $(`[data-container-id="${key}"]`)
  },

  getContainers: type => $(`[data-container="${type}"]`).get(),

  $getContainers: type => $(`[data-container="${type}"]`),

  priceString: (strings, priceInCents) => {
    const price = (priceInCents / 100).toFixed(2);
    return `$${price}`;
  },

  isActive: '.is-active',

  overlay: '[data-overlay]',

  toggle: '[data-toggle]',

  container: '[data-container]',

  slider: '[data-slider]',

  modal: '[data-modal]',
  modalContents: '[data-modal-contents]',
  openModal: '[data-open-modal]',
  closeModal: '[data-close-modal]',
  toggleModal: '[data-toggle-modal]',

  closeInlineCart: '[data-close-inline-cart]',
  toggleInlineCart: '[data-toggle-inline-cart]',
  inlineCart: '[data-inline-cart]',
  inlineCartContents: '[data-inline-cart-contents]',

  lineItemContainer: '[data-container="line-item"]',
  lineItemKey: '[data-line-item-key]',
  lineItemData: '[data-line-item-data]',

  productContainer: '[data-container="product"]',
  selectedOptionValue: '[data-selected-option-value]',
  optionValue: '[data-option-value]',
  optionData: '[data-option-data]',
  variantData: '[data-variant-data]',

  addToCart: '[data-add-to-cart]',
  removeFromCart: '[data-remove-from-cart]',

  quantityValue: '[data-quantity-value]',
  quantityChange: '[data-quantity-change]',

  price: '[data-price="price"]',
  compareAtPrice: '[data-price="compare-at-price"]',

  productGallerySlide: '[data-product-gallery-slide]',

  sliderHasNav: '[data-has-nav]',
};

export default dom;
