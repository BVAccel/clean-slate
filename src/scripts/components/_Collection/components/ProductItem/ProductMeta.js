import React, { Component } from 'react';

const ProductMeta = (props) => {
  const { collection, handle, title, vendor, prices } = props.product;

  return (
    <a
      href={`/collections/${collection}/products/${handle}`}
      className="product-item-meta"
    >
      <header className="oo-header product-item-header">
        <h2 className="oo-heading product-item-heading">{title}</h2>
        {vendor && <p className="oo-text product-item-subheading">{vendor}</p>}
      </header>

      <div className="oo-price product-item-price">
        {prices.range !== null ? prices.range : prices.min.string}
      </div>
    </a>
  );
};

export default ProductMeta;
