export const schema = `

type Query {
  activeSort: SortValue!
  activeFilters: [FilterValue]!
  collection: Collection!
  getSortOptions: [SortValue]!
  getActiveSort: String!
  getActiveFilters: [FilterValue]!
  getProducts: [CollectionProduct]!
}

type Mutation {
  addProducts(products: [CollectionProduct!]!)
}

type Collection {
  products: [CollectionProduct]!
  productsLoaded: Boolean!
}

type CollectionProduct {
  id: ID!
  handle: String!
  title: String!
  tags: [String]
  options: [CollectionProductOption!]!
  prices: CollectionProductPrices!
  images: [CollectionProductImage]!
}

type CollectionProductOption {
  name: String!
  values: [String!]!
  group: String
  label: String
}

type CollectionProductPrices {
  min: Price!
  max: Price
  range: String
}

type CollectionProductPrice {
  value: Int!
  string: String
}

type CollectionProductImage {
  alt: String
  lqip: String
  src: String
  src2x: String
  src3x: String
  srcset: String
}

type CollectionFilterOptions {
  tagDelimiter: String!
  forbiddenTags: [String]!
}

type FilterValue {
  value: String!
  group: String!
  type: String
  label: String!
}

type SortValue {
  value: String!
  label: String!
  group: String
  type: String
}

`;
