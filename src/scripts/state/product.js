import dom from 'common/Dom';
import bva from 'common/Constants';
import { setSearchParm } from 'common/Helpers';

import State from 'state';

const getVariant = id => {
  const state = State.get(id);
  const { options, variants } = state._data;
  const selectedOptions = options
    .map(option => option.name)
    .map(name => state[name]);
  const variant = variants.find(variant =>
    selectedOptions.every(selectedOption => variant.variant.options.includes(selectedOption)));
  return variant;
};

const getInitialOptionValues = options => {
  return options.reduce((optionValues, option) =>
    ({ ...optionValues, [option.name]: option.initialValue }), {});
};

const getInitialVariantData = variants => {
  const {variant: { id: variantId, price, compare_at_price }, inventory} = variants.find(variant => variant.isInitialVariant);
  return { variantId, inventory, price, compare_at_price };
};

export const getProductContainerData = container => {
  const containerSelector = (container) ? container : dom.productContainer;
  const containerData = $(containerSelector).get().map(productContainer => {
    const id = productContainer.dataset.containerId;
    const { data: options } = JSON.parse($(productContainer).find(dom.optionData).text());
    const { data: variants } = JSON.parse($(productContainer).find(dom.variantData).text());
    const initialOptionValues = getInitialOptionValues(options);
    const initialVariantData = getInitialVariantData(variants);
    const quantity = parseInt($(productContainer).find(dom.quantityValue).val(), 10) || null;
    return {
      _data: { options, variants },
      id,
      change: 'product',
      container: 'product',
      ...initialOptionValues,
      ...initialVariantData,
      quantity,
    };
  });

  return (containerData.length == 1) ? containerData[0] : containerData;
};

export const updateVariant = data => {
  const { variant: { id: variantId }} = getVariant(data.id);
  const change = 'variant';
  const container = 'product';

  State.set({ ...data, variantId, change, container });
  PubSub.publish(bva.updateInventory, data);
  PubSub.publish(bva.updatePrice, data);
  setSearchParm('variant', variantId);
};

export const updateInventory = data => {
  const { inventory } = getVariant(data.id);
  const change = 'inventory';
  const container = 'product';

  State.set({ ...data, inventory, change, container });
};

export const updatePrice = data => {
  const { variant: { price, compare_at_price }} = getVariant(data.id);
  const change = 'price';
  const container = 'product';

  State.set({ ...data, price, compare_at_price, change, container });
};

export const updateProductQuantity = data => {
  const change = 'quantity';
  const container = 'product';

  State.set({ ...data, change, container });
};

export const updateOptionGroupValue = data => {
  const { id, name, value } = data;
  const change = name;
  const container = 'product';

  State.set({ id, change, container, [name]: value });
  PubSub.publish(bva.updateVariant, data);
};

export const initProductContainers = data => {
  return getProductContainerData()
    .map(item => State.set(item));
};
