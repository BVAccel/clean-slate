const defaultState = {};

const schema = `
  type ProductImage {
    id: ID!
    alt: String
    lqip: String!
    src: String!
    src2x: String!
    src3x: String!
    srcset: String!
  }
`;

const resolvers = {};

export default { defaultState, schema, resolvers, };
