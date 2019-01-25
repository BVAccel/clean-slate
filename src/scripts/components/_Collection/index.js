import React from 'react';
import { render } from 'react-dom';

import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { combineResolvers } from 'graphql-resolvers'
import { ApolloProvider } from 'react-apollo';

import merge from 'lodash.merge';

import App, { parseInitialData } from 'collection/App';

import { getHandle } from 'common/Helpers';

const initialData = parseInitialData();

// console.log(initialData);

const cache = new InMemoryCache()
// .restore(initialData);

const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  clientState: {
    defaults: App.defaultState,
    resolvers: merge(...App.resolvers),
    typeDefs: App.schema.join(),
  },
  uri: 'https://bva-clean-slate.myshopify.com/api/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token': '66f8134d2f5fea4dbe340a5b6aa39d76'
  },
});

const ApolloApp = App => (
  <ApolloProvider client={client}>
    <App handle={getHandle('collection')} />
  </ApolloProvider>
);

render(ApolloApp(App), document.querySelector('[data-react-entrypoint="collection"]'));
