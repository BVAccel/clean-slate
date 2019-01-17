import React, { Component } from 'react';



class ProductItem extends Component {
  state = {};

  render() {
    console.log(this.props);
    const {collection, handle, image, options, price, tags, title, vendor} = this.props;
    return (
      <section className="s-flex-6 m-flex-4 l-flex-3">
        <a href={`/collections/${collection}/products/${handle}`} className="product-item-content">
          <div>
            <img src={image} />
          </div>
          <header className="product-item-header">
            <h2 className="product-item-header">{title}</h2>
            <p className="product-item-subheading">{vendor}</p>
          </header>
          <div>{price}</div>
        </a>
      </section>
    );
  }
}

export default ProductItem;
