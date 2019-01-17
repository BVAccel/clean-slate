import React from 'react';
import { render } from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: 'https://bva-clean-slate.myshopify.com/api/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token': '66f8134d2f5fea4dbe340a5b6aa39d76'
  }
});

const ApolloApp = App => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(ApolloApp(App), document.querySelector('[data-react-entrypoint="collection"]'));
