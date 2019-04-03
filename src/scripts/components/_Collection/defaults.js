import { parseInitialData } from './parseData';

export const defaults = {
  cursor: null,
  collectionProducts: [...parseInitialData()],
  _collectionProducts: [],
  productsLoaded: false,
  activeFilters: [],
  filterOptions: {
    tagDelimiter: '::',
    forbiddenTags: ['GuaranteeBadge', 'GuaranteeTab', 'SKU', 'SolidusId', 'collection'],
    __typename: 'CollectionFilterOptions',
  },
  activeSort: { value: null, __typename: 'SortValue' },
  sortOptions: [
    { value: 'TITLE_DESCENDING', label: 'Title: A - Z', __typename: 'SortValue' },
    { value: 'TITLE_ASCENDING', label: 'Title: Z - A', __typename: 'SortValue' },
    { value: 'PRICE_DESCENDING', label: 'Price: High to Low', __typename: 'SortValue' },
    { value: 'PRICE_ASCENDING', label: 'Price: Low to High', __typename: 'SortValue' },
  ],
};
