import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { ApolloConsumer, Mutation } from 'react-apollo';

import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isEqual';

import {
  getActiveFilters,
  getFilteredProducts,
  getFilterOptions,
  updateFilteredProducts } from './query.gql';

const generateOptions = values => {
  const __typename = 'CollectionProductFilter';
  const groups = values.reduce((groups, { group, value, type = 'option' }) =>
    ({ ...groups, [group]: [ ...groups[group] || [], {value, label: value, group, type, __typename } ]}), {});
  return Object.entries(groups).map(([label, options]) => ({ label, options }));
};

const parseTags = (tags, filterOptions) => {
  const { tagDelimiter, forbiddenTags } = filterOptions;
  return tags.reduce((legalTags, tag) => {
    const hasDelimiter = tag.includes(tagDelimiter);
    const isForbidden = forbiddenTags.some(category => tag.toLowerCase().includes(category.toLowerCase()));
    if (isForbidden || !hasDelimiter) return [ ...legalTags ];
    const [ group, value ] = tag.split(tagDelimiter);
    return [ ...legalTags, { group, value, type: 'tag' } ];
  }, []);
};

export const groupedOptions = ({products, apollo}) => {
  if (!products.length) return [];
  const {filterOptions} = apollo.client.readQuery({ query: getFilterOptions });
  const options = uniqWith(products.reduce((options, product) => [ ...options, ...product.options], []), isEqual);
  const tags = uniqWith(products.reduce((tags, product) =>
    [ ...tags, ...parseTags(product.tags, filterOptions) ], []), isEqual);
  return generateOptions([ ...options, ...tags ]);
};

const CollectionFiltering = props => {
  const { apollo, products, loaded } = props;

  return (
    <div className="collection-filtersort collection-filtering flex-half oo-grid">

      <Mutation
        mutation={updateFilteredProducts}>
        {mutate => (

          <Select
            isMulti
            isDisabled={!loaded}
            isLoading={!loaded}
            removeSelected
            options={groupedOptions({products, apollo})}
            components={makeAnimated()}
            onChange={(activeFilters) => {
              // console.log(activeFilters);
              mutate({ variables: { filters: activeFilters }})
            }}
            placeholder="Filters"
            className="flex-full"
            closeMenuOnSelect={false}
          />

        )}
      </Mutation>

    </div>
  );
};

export default CollectionFiltering;
