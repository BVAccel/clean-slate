import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

const handleAddToCartClick = ({ currentTarget: self }) => {
  const id = dom.getContainer(self).dataset.containerId;
  const { variantId, quantity, properties } = State.get(id);

  PubSub.publish(bva.addToCart, { id: variantId, quantity, properties });

  return false;
};

const handleRemoveFromCartClick = ({ currentTarget: self }) => {
  const id = dom.getContainer(self).dataset.containerId;
  const { key } = State.get(id);

  PubSub.publish(bva.removeFromCart, { key });

  return false;
};

export const bindActions = () => {
  $(dom.addToCart).on('click', handleAddToCartClick);
  $(document).on('click', dom.removeFromCart, handleRemoveFromCartClick);
};
