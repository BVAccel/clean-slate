import { gql } from 'apollo-boost';

import { getProducts } from './query.gql';

const defaultState = {
  collectionProducts: [],
};

const schema = `
  type Query {
    collectionProducts: [CollectionProduct]
  }
`;

const resolvers = {
  Query: {
    getProducts: (obj, variables, context) => {
      console.log(`ding`);
      console.log(obj);
      console.log(variables);
      console.log(context);
      // cache.writeData({ products: [ ...products ] });
      return;
    },
    fetchProducts: (obj, variables, context) => {
      console.log(`dong`);
      console.log(obj);
      console.log(variables);
      console.log(context);
      // cache.writeData({ products: [ ...products ] });
      return;
    },
  },
  Mutation: {
    updateActiveSort: (obj, variables, context) => {
      console.log(obj);
      console.log(variables);
      console.log(context);
      // cache.writeData({ products: [ ...products ] });
      return;
    },
  },
};

export default { defaultState, schema, resolvers, };
