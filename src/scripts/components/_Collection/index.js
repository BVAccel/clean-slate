import React from 'react';
import { render } from 'react-dom';

import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import merge from 'lodash.merge';

import App from 'collection/App';

const cache = new InMemoryCache()

import { defaults } from './defaults';
import { resolvers } from './resolvers';
import { schema as typeDefs } from './schema';

const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
  uri: 'https://bva-clean-slate.myshopify.com/api/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token': '66f8134d2f5fea4dbe340a5b6aa39d76'
  },
});

const ApolloApp = App => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(ApolloApp(App), document.querySelector('[data-react-entrypoint="collection"]'));
