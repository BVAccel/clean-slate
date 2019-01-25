import React, { Component } from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import Graphql from './graphql';

import { handlize, random } from 'common/Helpers';

import { groupedOptions } from 'collection/Filtering';

class CollectionSorting extends Component {
  state = {
    options: [
      {value: 'TITLE_DESCENDING', label: 'Title: A - Z' },
      {value: 'TITLE_ASCENDING', label: 'Title: Z - A' },
      {value: 'PRICE_DESCENDING', label: 'Price: High to Low' },
      {value: 'PRICE_ASCENDING', label: 'Price: Low to High' },
    ]
  }

  initFilterSort (products) {
    const filterGroups = groupedOptions(products).reduce((groups, { label }) => ({ ...groups, [label]: [] }), {});
    const urlParams = getSearchParm(Object.keys(filterGroups));
    const activeFilters = Object.entries(urlParams).reduce((activeFilters, [name, param]) =>
      ({ ...activeFilters, [name]: (param === null) ? [] : param.split(',') }), {});
    const activeSort = getSearchParm('sort');

    return { activeFilters, activeSort };
  };

  sortActiveProducts (unsortedActiveProducts) {
    const { activeSort, products } = this.state;
    if (activeSort === null) return unsortedActiveProducts;

    return unsortedActiveProducts
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        const priceA = a.price.value.min;
        const priceB = b.price.value.min;
        switch (activeSort) {
          case 'title-descending':
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
          case 'title-ascending':
            if (titleA > titleB) return -1;
            if (titleA < titleB) return 1;
            return 0;
          case 'price-descending':
            if (priceA > priceB) return -1;
            if (priceA < priceB) return 1;
            return 0;
          case 'price-ascending':
            if (priceA < priceB) return -1;
            if (priceA > priceB) return 1;
            return 0;
        }
      });
  };

  render() {
    return (
      <div className="collection-sorting flex-half oo-grid no-wrap">

        <ApolloConsumer>
          {client => {

            return (
              <Select
                isClearable
                removeSelected
                closeMenuOnSelect
                options={this.state.options}
                isMulti={false}
                components={makeAnimated()}
                onChange={({ value }) => {
                  console.log(`ding`);
                  client.writeData({ data: { activeSort: value } })
                }}
                placeholder="Sort"
                className="flex-full"
              />
            )

          }}
        </ApolloConsumer>

      </div>
    )
  }
};

CollectionSorting.defaultState = Graphql.defaultState;
CollectionSorting.schema = Graphql.schema;
CollectionSorting.resolvers = Graphql.resolvers;

export default CollectionSorting;
