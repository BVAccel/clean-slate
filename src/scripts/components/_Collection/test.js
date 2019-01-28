import React, { Component } from 'react';
import { Query, Mutation, graphql, ApolloConsumer } from 'react-apollo';

export const remoteMutationHOC = Wrapped => {
  return props => (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={remoteMutation}
          update={(cache, { data: { result } }) =>
            //-- This is where I would normally call cache.writeFragment, but since the
            //-- data I need to update lives locally, I can call a local mutation. After the call
            //-- to the local mutation - all my queries that depend on the local data will get refreshed.
            client.mutate({
              mutation: localMutation,
              variables: { result }
            })
          }
        >
          {(mutation, { loading, data }) => (
            <Wrapped {...props} mutation={mutation}  />
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  );
};
