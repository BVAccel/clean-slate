import dom from 'common/Dom';
import bva from 'common/Constants';

const handleCloseInlineCartClick = () => {
  PubSub.publish(bva.closeInlineCart, {});
};

const handleToggleInlineCartClick = () => {
  PubSub.publish(bva.toggleInlineCart, {});
};

export const bindActions = () => {
  $(dom.toggleInlineCart).on('click', handleToggleInlineCartClick);
  $(dom.inlineCart).on('click', dom.closeInlineCart, handleCloseInlineCartClick);
};
