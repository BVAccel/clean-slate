import React, { Component } from 'react';

import { unique, handlize } from 'common/Helpers';

const FilterGroup = ({
  groups,
}) => {
  return (
    <div className="flex-half">
      {Object.entries(groups).map(([name, values]) => {
        const handlizedName = handlize(name);
        const id = `filter-${handlizedName}`;
        return (
          <div className="" key={id}>
            <label htmlFor={id}>{name}: </label>
            <select name={handlizedName} id={id}>
              {values.map(value => <option value={value} key={value}>{value}</option>)}
            </select>
          </div>
        )
      })}
    </div>
  );
};

const ProductOptions = ({
  products,
}) => {
  if (!products.length) return <div>Loading...</div>;
  const optionGroups = products
    .reduce((options, product) => [ ...options, ...product.options ], [])
    .reduce((options, { name, values }) =>
      ({ ...options, [name]: unique([ ...options[name] || [], ...values ]) }), {});

  return <FilterGroup groups={optionGroups} />;
};

const ProductTags = ({
  products,
}) => {
  if (!products.length) return <div>Loading...</div>;
  const tagGroups = products
    .reduce((tags, product) => [ ...tags, ...product.tags ], [])
    .filter(tag => tag.includes('::'))
    .map(tag => tag.split('::'))
    .reduce((tags, [name, value]) =>
      ({ ...tags, [name]: unique([ ...tags[name] || [], value ]) }), {});

  return <FilterGroup groups={tagGroups} />;
};

class CollectionFiltering extends Component {
  state = {

  };

  componentDidMount () {
    console.log(this.props);
  };

  componentDidUpdate (prevProps, prevState) {
    console.log(this.props);
  };

  render() {
    return (
      <div className="flex-half oo-grid no-wrap">

        <ProductOptions products={this.props.products} />

        <ProductTags products={this.props.products} />

      </div>
    );
  }
};

export default CollectionFiltering;
