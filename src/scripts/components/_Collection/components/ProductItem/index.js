import React, { Component } from 'react';

import Graphql from './graphql';

import ProductImage from 'collection/ProductImage';
import OptionGroup from 'collection/OptionGroup';
import ProductMeta from 'collection/ProductMeta';

import Button from 'collection/Button';
import AddIcon from 'collection/IconAdd';

import { handlize, random } from 'common/Helpers';

const withQuickshop = false;

class ProductItem extends Component {
  state = {};

  render () {
    const { props } = this;
    const { apollo, handle: collection, product } = props;

    return (
      <section
        className={`s-flex-6 m-flex-4 l-flex-3 vv-product-item with-quickshop-${withQuickshop}`}
      >

        <ProductImage {...props} />

        <OptionGroup option="Color" {...props} />

        <ProductMeta {...props} />

        <div className="product-item-quickshop-toggles">

          <Button
            name="product-item-button"
            size="6"
            type="primary--alt"
            modifier="u-push-down"
            action="open-quickshop"
            text="Add to Cart" />

          <Button
            name="product-item-button"
            size="6"
            type="primary--alt"
            modifier="u-push-down"
            action="open-quickshop"
            text="Quickshop"
          >

            <AddIcon width="14px" />

          </Button>

        </div>

      </section>
    )
  }
};

ProductItem.defaultState = Graphql.defaultState;
ProductItem.schema = Graphql.schema;
ProductItem.resolvers = Graphql.resolvers;

export default ProductItem;
