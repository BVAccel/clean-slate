const defaultState = {};

const schema = `
  type Price {
    value: Int!
    string: String!
  }

  type Prices {
    min: Price!
    max: Price!
    range: String
  }
`;

const resolvers = {};

export default { defaultState, schema, resolvers, };
