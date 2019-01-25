const defaultState = {
  activeFilters: null,
};

const schema = `
  type FilterValue {
    group: String!
    label: String!
    value: String!
    type: String
  }

  type FilterGroup {
    label: String!
    options: [FilterValue!]!
  }
`;

const resolvers = {};

export default { defaultState, schema, resolvers, };
