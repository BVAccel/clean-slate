import Dom from 'common/Dom';

const parsePrices = prices => {
  const { min: _min, max: _max, price_min, price_max } = prices;
  const minValue = price_min || parseInt(_min.value) * 100;
  const maxValue = price_max || parseInt(_max.value) * 100;
  const range = (minValue !== maxValue) ? `${Dom.priceString(minValue)} - ${Dom.priceString(maxValue)}` : null;
  const min = { value: minValue, string: Dom.priceString(minValue), __typename: 'CollectionProductPrice' };
  const max = { value: maxValue, string: Dom.priceString(maxValue), __typename: 'CollectionProductPrice' };

  return { min, max, range, __typename: 'CollectionProductPrices' };
};

const parseImages = images => {
  const imageData = images.edges || images;

  return imageData.map(data => {
    const image = data.edge || data;
    const { alt, lqip, src, src2x, src3x } = image.image || image;
    const srcset = `${src} 1x, ${src2x} 2x, ${src3x} 3x`;
    const __typename = 'CollectionProductImage';

    return { alt, lqip, src, src2x, src3x, srcset, __typename };
  });
};

const parseOptions = options => {
  return options.reduce((optionValues, option) => {
    const { name, values, initialValue, position } = option;
    const __typename = 'CollectionProductOption';
    const transformedValues = option.values.map(value =>
      ({ value, group: option.name, type: 'option', label: value, __typename }));

    return [ ...optionValues, ...transformedValues ];
  }, []);
};

export const parseProductDataFromApollo = (edges) => {
  return edges.map(edge => {
    const { handle, tags, title } = edge.product;
    const options = parseOptions(edge.product.options);
    const prices = parsePrices(edge.product.prices);
    const images = parseImages(edge.product.images);
    const collections = edge.product.collections.edges.map(edge => edge.collection.handle);
    const featuredImage = images[0];
    const __typename = 'CollectionProduct';
    const id = atob(edge.product.id).replace(/.*\//, '');

    return { id, handle, tags, title, options, prices, images, featuredImage, collections, __typename };
  });
};

export const parseInitialData = () => {
  return Object.values(window.bvaccel.state.product)
    .map(product => product._data)
    .map(productData => {
      const { handle, collections, tags, title, price_min, price_max } = productData.product;
      const options = parseOptions(productData.options);
      const prices = parsePrices({price_min, price_max});
      const images = parseImages(productData.images);
      const featuredImage = images[0];
      const __typename = 'CollectionProduct';
      const id = productData.product.id.toString();

      return { id, handle, tags, collections, title, options, prices, images, featuredImage, __typename  };
    });
};
