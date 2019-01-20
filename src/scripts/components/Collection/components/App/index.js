import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';

import CollectionFiltering from '../Filtering';
import CollectionSorting from '../Sorting';
import CollectionGrid from '../Grid';

import Dom from 'common/Dom';

const parseProductData = products => {
  return products.map(({ node: {
    handle,
    title,
    vendor,
    images: imageData,
    options,
    tags,
    priceRange: {
      maxVariantPrice: {amount: maxPrice},
      minVariantPrice: {amount: minPrice}
    }
  }}) => {
    const min = parseInt(minPrice) * 100;
    const max = parseInt(maxPrice) * 100;
    const price = {
      value: { min, max, },
      string: {
        min: Dom.priceString(min),
        max: Dom.priceString(max),
        range: `${Dom.priceString(min)} - ${Dom.priceString(max)}`,
      },
    };
    const images = imageData.edges.map(({ node: image }) => image.transformedSrc);
    const featuredImage = images[0];
    return { handle, title, vendor, options, tags, price, images, featuredImage, };
  });
}

class App extends Component {
  state = {
    gotProducts: false,
    products: [],
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.props.data.shop && !this.state.gotProducts) {
      this.parseGraphqlData(this.props.data);
    }
  };

  parseGraphqlData (data) {
    console.log(`${(data.loading) ? 'loading' : 'got'} data.`);

    const { error, loading, shop } = data;
    const products = parseProductData(shop.collectionByHandle.products.edges);
    this.setState({
      products,
      gotProducts: true,
    });
  };

  filterProductData () {

  };

  sortProductData () {

  };

  render() {
    return (
      <div className="oo-grid">

        <CollectionFiltering
          products={this.state.products}
          update={this.filterProductData}
        />

        <CollectionSorting />

        <CollectionGrid
          error={this.props.data.error}
          loading={this.props.data.loading}
          products={this.state.products}
          collection={this.props.handle}
        />

      </div>
    );
  }
};

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
              images(first: 10) {
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

// const graphqlConfig = { options: { variables: { handle: getHandle('collection') }}};
const graphqlConfig = { options: props => ({
  variables: { handle: props.handle || 'all' }
})};
const withCollectionDataQuery = graphql(GET_PRODUCTS, graphqlConfig);
const AppWithCollectionData = withCollectionDataQuery(App);
export default AppWithCollectionData;
