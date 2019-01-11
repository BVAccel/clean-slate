import PubSub from 'pubsub-js';

import dom from 'common/Dom';
import bva from 'common/Constants';

import State from 'state';

import { getProductContainerData } from 'state/product';

const handleOpenQuickshopClick = ({ currentTarget: self }) => {
  const productContainer = dom.getParentContainer(self);
  const containerData = getProductContainerData(productContainer);
  const topic = bva.showModal;
  const modalData = { id: productContainer.dataset.containerId, containerData };
  const data = { name: 'quickshop', data: { ...modalData }};

  PubSub.publish(topic, data);

  return false;
};

export const bindActions = () => {
  $(dom.openQuickshop).on('click', handleOpenQuickshopClick);
};
