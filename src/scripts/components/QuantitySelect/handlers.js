import dom from 'common/Dom';

export const updateQuantity = (data) => {
  const { id: containerId, quantity } = data;

  $(`[data-container-id="${containerId}"] ${dom.quantityValue}`).val(quantity);
};
