import differenceWith from 'lodash.differencewith';

import {
  getCollectionProducts as GET_COLLECTION_PRODUCTS,
  _getCollectionProducts as _GET_COLLECTION_PRODUCTS, } from 'collection/App/query.gql';

import {
  getFilterOptions, } from 'collection/Filtering/query.gql';

export const resolvers = {
  Mutation: {
    updateSortOrder: (_, { sort }, { cache }) => {
      const {collectionProducts: products} = cache.readQuery({ query: GET_COLLECTION_PRODUCTS });

      if (sort === null) return products;

      const collectionProducts = products
        .sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          const priceA = a.prices.min.value;
          const priceB = b.prices.min.value;
          switch (sort.value) {
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

      cache.writeData({ data: { collectionProducts, activeSort: sort }});

      return collectionProducts;
    },
    updateFilteredProducts: (_, { filters }, { cache }) => {
      const {collectionProducts: products} = cache.readQuery({ query: GET_COLLECTION_PRODUCTS });
      const {_collectionProducts: _products} = cache.readQuery({ query: _GET_COLLECTION_PRODUCTS });
      const {filterOptions: { tagDelimiter }} = cache.readQuery({ query: getFilterOptions });

      if (!filters.length) {
        const allProducts = [ ..._products ];
        cache.writeData({ data: { collectionProducts: allProducts }});

        return allProducts;
      }

      const filteredProducts = _products.filter(product => {
        return filters.some(({ group, value, type }) => {
          if (type === 'option') {
            return product.options.some(option => option.group === group && option.value === value);
          }
          if (type === 'tag') {
            return product.tags.includes(`${group}${tagDelimiter}${value}`);
          }
        })
      });

      console.log(filteredProducts);

      cache.writeData({ data: { collectionProducts: filteredProducts }});

      return filteredProducts;
    },
  }
};
