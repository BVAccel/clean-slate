import React from 'react';
import { render } from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloLink } from 'apollo-link';
// import { withClientState } from 'apollo-link-state';

import App from './components/App';

import { getHandle } from 'common/Helpers';

// const cache = new InMemoryCache();
// const stateLink = withClientState({
//   cache
// });

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: 'https://bva-clean-slate.myshopify.com/api/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token': '66f8134d2f5fea4dbe340a5b6aa39d76'
  },
  // cache,
  // link: ApolloLink.from([
  //   stateLink,
  // ])
});

const ApolloApp = App => (
  <ApolloProvider client={client}>
    <App handle={getHandle('collection')} />
  </ApolloProvider>
);

render(ApolloApp(App), document.querySelector('[data-react-entrypoint="collection"]'));
