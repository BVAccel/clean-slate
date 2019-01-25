const defaultState = {};

const schema = `
  type CollectionProduct {
    id: ID!
    handle: String!
    title: String!
    tags: [String!]!
    options: [ProductOption!]!
    prices: Prices!
    images: [CollectionProductImage]!
  }
`;

const resolvers = {};

export default { defaultState, schema, resolvers, };
