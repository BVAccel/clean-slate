const defaultState = {
  activeSort: '',
};

const schema = `
  type SortValue {
    label: String!
    value: String!
  }
`;

const resolvers = {};

export default { defaultState, schema, resolvers, };
