import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

const handleQuantityChangeClick = ({ currentTarget: self, ...rest }) => {
  const change = parseInt(self.dataset.quantityChange, 10);
  const container = $(self).closest(dom.container)[0];
  const { container: type, containerId: id } = container.dataset;
  const { quantity: oldQuantity, inventory, key } = State.get(id);
  const newQuantity = oldQuantity + change;

  if (newQuantity > inventory) {
    const topic = bva.showModal;
    const data = {
      name: 'not-enough-inventory',
      data: { newQuantity, inventory },
    };

    PubSub.publish(topic, data);
  } else if (newQuantity >= 1) {
    const topic = `${bva.updateQuantity}.${type
      .toUpperCase()
      .replace('-', '_')}`;
    const data = { id, key, quantity: newQuantity };

    PubSub.publish(topic, data);
  } else if (newQuantity === 0 && type === 'line-item') {
    const topic = bva.removeFromCart;
    const data = { id, key };

    PubSub.publish(topic, data);
  }

  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.quantityChange, handleQuantityChangeClick);
};
