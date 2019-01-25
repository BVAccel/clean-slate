import React, { Component } from 'react';
import { Query, Mutation, graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import isBase64 from 'is-base64';

import Graphql from './graphql';
import { fetchProducts, getProducts, } from './query.gql';

import CollectionGrid from 'collection/CollectionGrid';

import Dom from 'common/Dom';

const parsePrices = prices => {
  const { min: _min, max: _max, price_min, price_max } = prices;

  const minValue = price_min || parseInt(_min.value) * 100;
  const maxValue = price_max || parseInt(_max.value) * 100;
  const range = (minValue !== maxValue) ? `${Dom.priceString(minValue)} - ${Dom.priceString(maxValue)}` : null;
  const min = { value: minValue, string: Dom.priceString(minValue), __typename: 'Price' };
  const max = { value: maxValue, string: Dom.priceString(maxValue), __typename: 'Price' };

  return { min, max, range, __typename: 'Prices' };
};

const parseImages = images => {
  const imageData = images.edges || images;

  return imageData.map(data => {
    const image = data.edge || data;
    const { alt, lqip, src, src2x, src3x } = image.image || image;
    const id = (isBase64(image.id)) ? btoa(atob(image.id).replace(/.*\//, '')) : btoa(image.id);
    const srcset = `${src} 1x, ${src2x} 2x, ${src3x} 3x`;
    const __typename = 'CollectionProductImage';

    return { id, alt, lqip, src, src2x, src3x, srcset, __typename };
  });
};

const parseOptions = options => {
  return options.map(option => {
    const { name, values } = option;
    const __typename = 'CollectionProductOption';

    return { name, values, __typename };
  });
};

export const parseInitialData = () => {
  return Object.values(window.bvaccel.state.product)
    .map(product => product._data)
    .map(productData => {
      const { handle, tags, title, price_min, price_max } = productData.product;
      const id = btoa(productData.product.id);
      const options = parseOptions(productData.options);
      const prices = parsePrices({price_min, price_max});
      const images = parseImages(productData.images)
      const featuredImage = images[0];

      return { id, handle, tags, title, options, prices, images, featuredImage, __typename: 'CollectionProduct' };
    });
};

class App extends Component {
  state = {};

  parseProductDataFromApollo (data = {}) {
    const { collection = {} } = data;
    const { products = {} } = collection;
    const { edges = [] } = products;

    return edges.map(edge => {
      const { handle, tags, title } = edge.product;
      const options = parseOptions(edge.product.options);
      const prices = parsePrices(edge.product.prices);
      const images = parseImages(edge.product.images);
      const featuredImage = images[0];
      const id = btoa(atob(edge.product.id).replace(/.*\//, ''));

      return { id, handle, tags, title, options, prices, images, featuredImage, __typename: 'CollectionProduct' };
    });
  };

  updateQuery (prev, { fetchMoreResult: next }) {
    const { edges: oldEdges } = prev.collection.products;
    const { edges: newEdges, pageInfo, __typename } = next.collection.products;

    if (newEdges.length) {
      return {
        ...prev,
        collection: {
          ...prev.products,
          products: {
            edges: [ ...oldEdges, ...newEdges ],
            pageInfo,
            __typename,
          },
          __typename: next.collection.__typename
        }
      }
    }

    return prev;
  };

  fetchMoreProducts = apollo => {
    const { updateQuery } = this;
    const { client, data, error, loading, fetchMore } = apollo;
    const { collection = {}} = data;
    const { products = {}} = collection;
    const { edges = [], pageInfo = {} } = products;

    if (pageInfo.hasNextPage === true) {
      const cursor = edges[edges.length - 1].cursor;
      const step = 50;
      const variables = { cursor, step };

      fetchMore({ variables, updateQuery, });
    }

    if (pageInfo.hasNextPage === false) {
      const parsedProducts = this.parseProductDataFromApollo(data);
      const oldData = client.readQuery({ query: getProducts });
      const newData = [ ...oldData, ...parsedProducts ];

      console.log(newData);

      client.writeData({data: { collectionProducts: newData }});

      const fresh = client.readQuery({ query: getProducts });

      console.log(fresh);
    }
  };

  render () {
    const { props, state, } = this;

    return (
      <Query
        query={fetchProducts}
        variables={{ step: 25, handle: props.handle }}
      >

        {apollo =>

          <CollectionGrid {...props}
            parsedProducts={this.parseProductDataFromApollo(apollo.data)}
            apollo={apollo}
            fetchMoreProducts={this.fetchMoreProducts} />

        }

      </Query>
    );
  }
};

App.defaultState = {
  ...Graphql.defaultState,
  ...CollectionGrid.defaultState,
};

App.schema = [
  Graphql.schema,
  ...CollectionGrid.schema,
];

App.resolvers = [
  Graphql.resolvers,
  ...CollectionGrid.resolvers,
];

export default App;
