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
  getContainer: (key, asjQuery = false, context = document) => {
    if (key instanceof Element) {
      return (asjQuery)
        ? $(key).closest(dom.container)
        : $(key).closest(dom.container)[0];
    } else if ($(`[data-container-id="${key}"]`, context).length) {
      return (asjQuery)
        ? $(`[data-container-id="${key}"]`, context)
        : $(`[data-container-id="${key}"]`, context)[0];
    } else if ($(`[data-container-name="${key}"]`, context).length) {
      return (asjQuery)
        ? $(`[data-container-name="${key}"]`, context)
        : $(`[data-container-name="${key}"]`, context)[0];
    } else if ($(`[data-container="${key}"]`, context).length) {
      return (asjQuery)
        ? $(`[data-container="${key}"]`, context)
        : $(`[data-container="${key}"]`, context).get();
    }

    return;
  },

  getContainers: type => $(`[data-container="${type}"]`).get(),
  $getContainers: type => $(`[data-container="${type}"]`),

  getSelf: self => $(self).closest(dom.container)[0],
  $getSelf: self => $(self).closest(dom.container),

  getParentContainer: (self, levels = 1, asjQuery = false) => {
    if (levels !== 0) {
      const parentContainer = dom.getContainer($(self).parent()[0]);
      return dom.getParentContainer(parentContainer, levels - 1);
    }
    return (asjQuery)
      ? dom.getContainer(self, true)
      : dom.getContainer(self);
  },

  priceString: priceInCents => `$${(priceInCents / 100).toFixed(2)}`,

  isActive: '.is-active',
  isActiveSelector: '.is-active',
  isActiveClassName: 'is-active',

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
  compareAtPrice: '[data-price="compare_at_price"]',

  productGallerySlide: '[data-product-gallery-slide]',

  sliderHasNav: '[data-has-nav]',

  sliderFilterValue: '[data-filter-value]',

  galleryThumb: '[data-gallery-thumb]',
  gallerySlide: '[data-gallery-slide]',

  openQuickshop: '[data-open-quickshop]',
};
window.a = dom.getParentContainer;

export default dom;
