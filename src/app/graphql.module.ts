import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {UUIDGenerator} from '../uuid.generator';

const uri = `${environment.hostPort}/graphql`; // <-- add the URL of the GraphQL server here
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

// make static in the future;
const uuidGenerator = new UUIDGenerator();

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri,
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Correlation-ID': uuidGenerator.generateUUID()
      })
    }),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
