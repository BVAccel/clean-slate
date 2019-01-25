import React, { Component } from 'react';

import CollectionFiltering from 'collection/Filtering';
import CollectionSorting from 'collection/Sorting';
import ProductItem from 'collection/ProductItem';

import { random } from 'common/Helpers';

const Loading = ({ width = 'full' }) =>
  <div className={`flex-${width} u-text-center`}>Loading...</div>;

const ProductItems = props => {
  props.fetchMoreProducts(props.apollo);

  return props.products.map(product =>
    <ProductItem product={product} {...props} key={random(9)} />);
};

class CollectionGrid extends Component {
  state = {
    finishedInitialLoad: false,
  };

  render() {
    const { props } = this;
    const { apollo, fetchMoreroducts, parsedProducts } = props;
    const { data, loading, error, client } = apollo;

    if (loading) return null;
    if (error) return `Error!: ${error}`;

    return (
      <div className="collection-grid oo-grid">

        <section className="collection-filtersort oo-grid flex-full">

          <CollectionFiltering {...props} />

          <CollectionSorting {...props} />

        </section>

        <section
          className="oo-grid vv-collection-grid flex-full"
          data-container="grid"
          data-container-name="Collection Grid"
          data-container-id={`grid-${random(9)}`}
        >

          {parsedProducts.length &&
            <ProductItems {...props} products={parsedProducts} />}

        </section>

      </div>
    );
  }
};

CollectionGrid.defaultState = {
  ...CollectionFiltering.defaultState,
  ...CollectionSorting.defaultState,
  ...ProductItem.defaultState,
};

CollectionGrid.schema = [
  CollectionFiltering.schema,
  CollectionSorting.schema,
  ProductItem.schema,
];

CollectionGrid.resolvers = [
  CollectionFiltering.resolvers,
  CollectionSorting.resolvers,
  ProductItem.resolvers,
];

export default CollectionGrid;
