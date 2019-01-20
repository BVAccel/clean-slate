import React from 'react';

import ProductItem from '../ProductItem';

import { random } from 'common/Helpers';

const ProductItems = ({
  error,
  loading,
  products,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;
  return products.map(product => <ProductItem {...product} key={product.handle} />);
};

const ProductGrid = props => (
  <section
    className="oo-grid vv-collection-grid"
    data-container="grid"
    data-container-name="Collection Grid"
    data-container-id={`grid-${random(9)}`}
  >

    <ProductItems {...props} />

  </section>
);

export default ProductGrid;
