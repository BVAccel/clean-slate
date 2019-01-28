import React, { Component } from 'react';
import { Query, Mutation, graphql, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import isBase64 from 'is-base64';
import uniqby from 'lodash.uniqby';

import {
  productData as PRODUCT_DATA,
  fetchProducts as FETCH_PRODUCTS, } from './query.gql';

import CollectionGrid from 'collection/CollectionGrid';

import Dom from 'common/Dom';
import { getHandle } from 'common/Helpers';


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

export const parseInitialData = () => {
  return Object.values(window.bvaccel.state.product)
    .map(product => product._data)
    .map(productData => {
      const { handle, tags, title, price_min, price_max } = productData.product;
      const options = parseOptions(productData.options);
      const prices = parsePrices({price_min, price_max});
      const images = parseImages(productData.images)
      const featuredImage = images[0];
      const __typename = 'CollectionProduct';
      const id = productData.product.id.toString();

      return { id, handle, tags, title, options, prices, images, featuredImage, __typename  };
    });
};

const parseProductDataFromApollo = (edges) => {
  return edges.map(edge => {
    const { handle, tags, title } = edge.product;
    const options = parseOptions(edge.product.options);
    const prices = parsePrices(edge.product.prices);
    const images = parseImages(edge.product.images);
    const featuredImage = images[0];
    const __typename = 'CollectionProduct';
    const id = atob(edge.product.id).replace(/.*\//, '');

    return { id, handle, tags, title, options, prices, images, featuredImage, __typename };
  });
};

const updateQuery = (prev, { fetchMoreResult: next }) => {
  const oldData = prev.collectionProducts;
  const newData = parseProductDataFromApollo(next.collectionByHandle.products.edges);
  const { edges } = next.collectionByHandle.products;

  if (edges.length) {
    const cursor = edges[edges.length - 1].cursor;

    return {
      ...prev,
      collectionProducts: uniqby([ ...oldData, ...newData ], 'handle'),
      pageInfo: next.collectionByHandle.products.pageInfo,
      cursor,
    }
  }

  return {
    ...prev,
    cursor: false,
  };
};

const fetchMoreProducts = apollo => {
  if (apollo.data.productsLoaded) return;
  const { data, fetchMore } = apollo;

  const query = FETCH_PRODUCTS;
  const step = 50;
  const handle = getHandle('collection');
  const cursor = data.cursor;
  const variables = { step, handle, cursor };

  if (cursor === false) {
    apollo.client.writeData({ data: {
      productsLoaded: true,
      collectionProducts: data.collectionProducts,
      _collectionProducts: data.collectionProducts,
    }});
  } else {
    fetchMore({ query, updateQuery, variables });
  }
};

const App = props => {
  return (
    <Query query={PRODUCT_DATA}>
      {apollo => {
        const { collectionProducts: products, productsLoaded } = apollo.data;
        fetchMoreProducts(apollo);

        return (
          <CollectionGrid
            products={products}
            loaded={productsLoaded}
            apollo={apollo}
            {...props} />
        );
      }}
    </Query>
  );
};

export default App;
