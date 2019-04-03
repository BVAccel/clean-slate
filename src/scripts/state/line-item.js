import dom from 'common/Dom';

import State from 'state';

export const updateLineItemQuantity = (data) => {
  const change = 'QUANTITY';
  const container = 'line-item';

  State.set({ ...data, change, container });
};

const getLineItemContainerData = () => {
  return $(dom.lineItemContainer)
    .get()
    .map((lineItemContainer) => {
      const id = lineItemContainer.dataset.containerId;
      const { data } = JSON.parse(
        $(lineItemContainer)
          .find(dom.lineItemData)
          .text(),
      );
      const {
        key,
        properties,
        variant: {
          variant: { id: variantId, price, compare_at_price },
          inventory,
        },
      } = data;
      const quantity = parseInt(
        $(lineItemContainer)
          .find(dom.quantityValue)
          .val(),
        10,
      );
      return {
        _data: data,
        id,
        change: 'LINE_ITEM',
        container: 'line-item',
        key,
        properties,
        variantId,
        quantity,
        inventory,
        price,
        compare_at_price,
      };
    });
};

export const initLineItemContainers = (data) => {
  State.clear('line-item');
  return getLineItemContainerData().map((item) => State.set(item));
};
