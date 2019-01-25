import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import Graphql from './graphql';

import { unique, handlize, random } from 'common/Helpers';

const forbiddenCategories = [
  'GuaranteeBadge',
  'GuaranteeTab',
  'SKU',
  'SolidusId',
  'collection',
];

const includesForbiddenCategory = tag => {
  return forbiddenCategories.every(category => !tag.toLowerCase().includes(category.toLowerCase()));
};

const getOptions = products => {
  return products
    .reduce((options, { product }) => [ ...options, ...product.options ], [])
    .reduce((options, { name, values }) =>
      ({ ...options, [name]: unique([ ...options[name] || [], ...values ]) }), {});
};

const getTags = products => {
  return products
    .reduce((tags, { product }) => [ ...tags, ...product.tags ], [])
    .filter(tag => tag.includes('::'))
    .filter(includesForbiddenCategory)
    .map(tag => tag.split('::'))
    .reduce((tags, [name, value]) =>
      ({ ...tags, [name]: unique([ ...tags[name] || [], value ]) }), {});
};

const generateOptions = (values, type) => {
  return Object.entries(values).map(([label, rawOptions]) => {
    const options = rawOptions.map(option =>
      ({ value: option, label: option, type, group: label }));

    return { label, options }
  });
};

export const groupedOptions = data => {
  if (!data.collection) return;

  const { edges: products } = data.collection.products || {};
  const productOptionOptions = getOptions(products);
  const tagOptions = getTags(products);

  return [
    ...generateOptions(productOptionOptions, 'option'),
    ...generateOptions(tagOptions, 'tag'),
  ];
};

class CollectionFiltering extends Component {
  initFilterSort (products) {
    const filterGroups = groupedOptions(products).reduce((groups, { label }) => ({ ...groups, [label]: [] }), {});
    const urlParams = getSearchParm(Object.keys(filterGroups));
    const activeFilters = Object.entries(urlParams).reduce((activeFilters, [name, param]) =>
      ({ ...activeFilters, [name]: (param === null) ? [] : param.split(',') }), {});
    const activeSort = getSearchParm('sort');

    return { activeFilters, activeSort };
  };

  filterProductData = (selectedOptions, action) => {
    const currentFilters = [];
    const changedOption = (action.action === 'select-option') ? action.option : action.removedValue;
    const { value, group } = changedOption || {};
    let updatedFilterGroup;

    switch (action.action) {
      case 'select-option':
        updatedFilterGroup = { [group]: [ ...currentFilters[group] || [], value ]};
        break;
      case 'remove-value':
        updatedFilterGroup = { [group]: [ ...currentFilters[group].filter(filter => filter !== value) ]};
        break;
      case 'clear':
        updatedFilterGroup = Object.keys(currentFilters).reduce((state, key) => ({ ...state, [key]: [] }), {});
        break;
    }

    const activeFilters = { ...currentFilters, ...updatedFilterGroup };
  };

  filterActiveProducts (products) {
    const { activeFilters } = this.state;
    const hasActiveFilters = Object.entries(activeFilters).filter(([name, values]) => values.length).length > 0;

    if (!hasActiveFilters) return [ ...products ];

    return products.filter(product => {
      return Object.entries(activeFilters)
        .filter(([name, values]) => values.length)
        .some(([name, values]) => {
          const isTag = values.some(value => product.tags.includes(`${name}::${value}`));
          if (isTag) return true;
          const option = product.options.find(option => option.name === name);
          if (!option) return false;
          const isOption = values.some(value => option.values.includes(value));
          return isOption;
        });
    });
  };

  render() {
    return (
      <div className="collection-filtering flex-half oo-grid">

        <Select
          isMulti
          removeSelected
          options={groupedOptions(this.props.apollo.data)}
          components={makeAnimated()}
          onChange={this.props.update}
          placeholder="Filters"
          className="flex-full"
          closeMenuOnSelect={false}
        />

      </div>
    );
  }
};

CollectionFiltering.defaultState = Graphql.defaultState;
CollectionFiltering.schema = Graphql.schema;
CollectionFiltering.resolvers = Graphql.resolvers;

export default CollectionFiltering;
