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
    const name = 'not-enough-inventory';
    const data = { newQuantity, inventory };
    PubSub.publish(bva.showModal, { name, data });
  } else if (newQuantity >= 1) {
    const topic = `${bva.updateQuantity}.${type.toUpperCase().replace('-', '_')}`;
    PubSub.publish(topic, { id, key, quantity: newQuantity });
  }

  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.quantityChange, handleQuantityChangeClick);
};
