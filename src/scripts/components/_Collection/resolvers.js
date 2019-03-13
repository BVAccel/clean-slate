import differenceWith from 'lodash.differencewith';

import {
  getCollectionProducts as GET_COLLECTION_PRODUCTS,
  _getCollectionProducts as _GET_COLLECTION_PRODUCTS,
} from 'collection/App/query.gql';

import { getFilterOptions as GET_FILTER_OPTIONS } from 'collection/Filtering/query.gql';

import { getActiveSort as GET_ACTIVE_SORT } from 'collection/Sorting/query.gql';

import { sortProducts } from 'collection/Sorting';
import { filterProducts } from 'collection/Filtering';

export const resolvers = {
  Mutation: {
    updateSortOrder: (_, { sort }, { cache }) => {
      const { collectionProducts: products } = cache.readQuery({
        query: GET_COLLECTION_PRODUCTS,
      });
      const collectionProducts = sortProducts(products, sort);

      cache.writeData({ data: { collectionProducts, activeSort: sort } });

      return collectionProducts;
    },
    updateFilteredProducts: (_, { filters }, { cache }) => {
      const { collectionProducts: products } = cache.readQuery({
        query: GET_COLLECTION_PRODUCTS,
      });
      const { _collectionProducts: _products } = cache.readQuery({
        query: _GET_COLLECTION_PRODUCTS,
      });
      const {
        filterOptions: { tagDelimiter },
      } = cache.readQuery({ query: GET_FILTER_OPTIONS });
      const { activeSort: sort } = cache.readQuery({ query: GET_ACTIVE_SORT });
      const filteredProducts = filterProducts(_products, filters, tagDelimiter);
      const sortedFilteredProducts = sortProducts(filteredProducts, sort);

      cache.writeData({ data: { collectionProducts: sortedFilteredProducts } });

      return filteredProducts;
    },
  },
};
