import React, { Component } from 'react';

// import AddIcon from './icon-add.svg';

const ProductItem = ({
  collection,
  handle,
  title,
  vendor,
  options,
  tags,
  price,
  images,
  featuredImage,
}) => (
  <section className="s-flex-6 m-flex-4 l-flex-3 vv-product-item with-quickshop">
    <a
      href={`/collections/${collection}/products/${handle}`}
      className="product-item-content">

      <div className="oo-image-wrapper">
        <img
          className="oo-image lazyload"
          src={featuredImage}
          alt=""
          data-src=""
          data-src="" />
      </div>

      <header className="oo-header product-item-header">
        <h2 className="oo-heading product-item-heading">{title}</h2>
        <p className="oo-text product-item-subheading">{vendor}</p>
      </header>

      <div className="oo-price product-item-price">
        {(price.value.min !== price.value.max)
          ? price.string.range
          : price.string.min}
      </div>
    </a>


    <div className="product-item-quickshop-toggles">
      <button
        className="oo-button product-item-button button--primary-alt flex-6 u-push-down"
        >Add to Cart</button>

      <button
        className="oo-button product-item-button button--primary-alt flex-6 u-push-down"
        data-open-quickshop>
        {/*<AddIcon />*/}
        Quickview
      </button>
    </div>
  </section>
);

export default ProductItem;
