import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import Dom from 'common/Dom';

import ProductItem from './ProductItem';

const getCollectionHandle = () =>
  window.location.pathname.replace(/\/collections\/(.*)\/?/, '$1');

const ProductGrid = ({ handle }) => (
  <Query query={GET_PRODUCTS} variables={{ handle: getCollectionHandle() }}>
    {({ loading, error, data }) => {
      console.log(`${(loading) ? 'loading' : 'got'} data.`);
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;
      console.log(data.shop);
      const { edges: products } = data.shop.collectionByHandle.products;
      return products.map(({ node: product }) => {
        const {
          handle,
          title,
          vendor,
          images,
          options,
          tags,
          priceRange: {
            maxVariantPrice: {amount: max},
            minVariantPrice: {amount: min}
          }
        } = product;
        console.log(typeof(parseInt(min)));
        const minPrice = Dom.priceString(parseInt(min) * 100);
        const maxPrice = Dom.priceString(parseInt(max) * 100);
        const price = (max === min) ? minPrice : `${minPrice} - ${maxPrice}`
        const image = images.edges[0].node.transformedSrc
        const props = { handle, title, vendor, image, price, options, tags, collection: getCollectionHandle() };
        return <ProductItem {...props} key={handle} />
      });
    }}
  </Query>
);

class App extends Component {
  state = {};

  render() {
    return (
      <div>

        <ProductGrid />

      </div>
    );
  }
}

export default App;

const GET_PRODUCTS = gql`
  query GetCollectionProducts($handle: String!) {
    shop {
      collectionByHandle(handle: $handle) {
        products(first: 250) {
          edges {
            node {
              handle
              title
              vendor
              options(first: 3) {
                name
                values
              }
              tags
              images(first: 1) {
                edges {
                  node {
                    transformedSrc(maxWidth: 400 preferredContentType: JPG scale: 2)
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
                maxVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

