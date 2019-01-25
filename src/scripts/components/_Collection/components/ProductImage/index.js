import React, { Component } from 'react';

class ProductImage extends Component {

  render() {
    const { collection, handle, featuredImage, } = this.props.product;

    return (
      <a
        href={`/collections/${collection}/products/${handle}`}
        className="product-item-image oo-image-wrapper"
      >

        <img
          className="oo-image lazyload"
          src={(this.props.initialLoad) ? featuredImage.src : featuredImage.lqip}
          alt={featuredImage.alt}
          data-sizes="auto"
          data-srcset={featuredImage.srcset} />

      </a>
    );
  }
};

export default ProductImage;
