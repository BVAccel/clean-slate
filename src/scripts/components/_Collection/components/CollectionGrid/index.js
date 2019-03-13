import React, { Component } from 'react';
import { Query, Mutation, graphql, ApolloConsumer } from 'react-apollo';

import CollectionFiltering from 'collection/Filtering';
import CollectionSorting from 'collection/Sorting';
import ProductItem from 'collection/ProductItem';

import { random } from 'common/Helpers';

const CollectionGrid = (props) => {
  const { apollo, products } = props;

  return (
    <div className="collection-grid flex-full">
      <section className="collection-filtersort oo-grid flex-full">
        <CollectionFiltering products={products} {...props} />

        <CollectionSorting products={products} {...props} />
      </section>

      <section
        className="oo-grid vv-collection-grid flex-full"
        data-container="grid"
        data-container-name="Collection Grid"
        data-container-id={`grid-${random(9)}`}
      >
        {products.map((product) => (
          <ProductItem {...props} product={product} key={product.handle} />
        ))}
      </section>
    </div>
  );
};

export default CollectionGrid;
