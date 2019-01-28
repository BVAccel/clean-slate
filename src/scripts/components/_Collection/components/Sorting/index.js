import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import {
  getSortOptions as GET_SORT_OPTIONS,
  updateSortOrder as UPDATE_SORT_ORDER, } from './query.gql';

const CollectionSorting = props => {
  const { apollo, loaded } = props;

  return (
    <div className="collection-filtersort collection-sorting flex-half oo-grid no-wrap">

      <Mutation
        mutation={UPDATE_SORT_ORDER}>
        {mutate => (

          <Select
            isClearable
            isDisabled={!loaded}
            isLoading={!loaded}
            removeSelected
            closeMenuOnSelect
            options={apollo.client.readQuery({ query: GET_SORT_OPTIONS }).sortOptions}
            isMulti={false}
            components={makeAnimated()}
            onChange={change => mutate({ variables: { sort: change } })}
            placeholder="Sort"
            className="flex-full"
          />

        )}
      </Mutation>

    </div>
  )
};

export const sortProducts = (products, { value }) => {
  if (!value || value === null) return products;
  return products
    .sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      const priceA = a.prices.min.value;
      const priceB = b.prices.min.value;
      switch (value) {
        case 'TITLE_DESCENDING':
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        case 'TITLE_ASCENDING':
          if (titleA > titleB) return -1;
          if (titleA < titleB) return 1;
          return 0;
        case 'PRICE_DESCENDING':
          if (priceA > priceB) return -1;
          if (priceA < priceB) return 1;
          return 0;
        case 'PRICE_ASCENDING':
          if (priceA < priceB) return -1;
          if (priceA > priceB) return 1;
          return 0;
      }
    });
};

export default CollectionSorting;
