import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleElement, getAlternativeTemplate } from 'common/Helpers';

export const updateInlineCartUI = (data) => {
  const resource = 'cart';
  const templateName = 'ajax-inline-cart';
  return getAlternativeTemplate({ resource, templateName })
    .then((newCart) => $(dom.inlineCartContents).html(newCart))
    .then(() => {
      PubSub.publish(bva.updateInlineCartUI, {});
      PubSub.publish(bva.openInlineCart, {});
    });
};

export const openInlineCart = (data) => {
  const action = 'add';
  const animated = true;

  return toggleElement({ selector: dom.overlay, action, animated }).then(() => toggleElement({ selector: dom.inlineCart, action, animated }));
};

export const closeInlineCart = (data) => {
  const action = 'remove';
  const animated = true;

  return toggleElement({ selector: dom.inlineCart, action, animated }).then(() => toggleElement({ selector: dom.overlay, action, animated }));
};

export const toggleInlineCart = (data) => {
  const inlineCartOpen = $(dom.inlineCart).is(dom.isActive);
  return inlineCartOpen ? closeInlineCart(data) : openInlineCart(data);
};
