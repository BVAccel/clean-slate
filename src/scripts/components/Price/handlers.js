import dom from 'common/Dom';
import bva from 'common/Constants';

export const updatePrice = data => {
  const { id, data: { price, compare_at_price }} = data;
  const $container = dom.getContainer(id, true);
  const priceElement = $container.find(dom.price)[0];
  const compareAtPriceElement = $container.find(dom.compareAtPrice)[0];
  const compareAtPriceText = (compare_at_price == null) ? '' : dom.priceString`${compare_at_price}`;

  priceElement.textContent = dom.priceString`${price}`;
  compareAtPriceElement.textContent = compareAtPriceText;
};
