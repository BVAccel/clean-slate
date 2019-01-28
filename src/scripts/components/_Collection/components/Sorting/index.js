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

export default CollectionSorting;
