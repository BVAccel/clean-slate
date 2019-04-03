import React, { Component } from 'react';
import { Query, Mutation, graphql, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import isBase64 from 'is-base64';
import uniqby from 'lodash.uniqby';

import { productData as PRODUCT_DATA, fetchProducts as FETCH_PRODUCTS } from './query.gql';

import CollectionGrid from 'collection/CollectionGrid';

import Dom from 'common/Dom';
import { getHandle } from 'common/Helpers';
import { parseProductDataFromApollo } from '../../parseData';

const updateQuery = (prev, { fetchMoreResult: next }) => {
  const oldData = prev.collectionProducts;
  const newData = parseProductDataFromApollo(next.collectionByHandle.products.edges);
  const { edges } = next.collectionByHandle.products;

  if (edges.length) {
    const cursor = edges[edges.length - 1].cursor;

    return {
      ...prev,
      collectionProducts: uniqby([...oldData, ...newData], 'handle'),
      pageInfo: next.collectionByHandle.products.pageInfo,
      cursor,
    };
  }

  return {
    ...prev,
    cursor: false,
  };
};

const fetchMoreProducts = (apollo) => {
  if (apollo.data.productsLoaded) return;
  const { data, fetchMore } = apollo;

  const query = FETCH_PRODUCTS;
  const step = 50;
  const handle = getHandle('collection');
  const cursor = data.cursor;
  const variables = { step, handle, cursor };

  if (cursor === false) {
    apollo.client.writeData({
      data: {
        productsLoaded: true,
        collectionProducts: data.collectionProducts,
        _collectionProducts: data.collectionProducts,
      },
    });
  } else {
    fetchMore({ query, updateQuery, variables });
  }
};

const App = (props) => {
  return (
    <Query query={PRODUCT_DATA}>
      {(apollo) => {
        const { collectionProducts: products, productsLoaded } = apollo.data;
        fetchMoreProducts(apollo);

        return <CollectionGrid products={products} loaded={productsLoaded} apollo={apollo} {...props} />;
      }}
    </Query>
  );
};

export default App;
