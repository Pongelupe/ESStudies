import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment.prod';
import { ApolloLink } from 'apollo-link';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  declarations: []
})
export class ApolloConfigModuleModule {

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const uri = 'https://api.graph.cool/simple/v1/cjll6oa7d33iu0192082ot9n8';
    const http = httpLink.create({ uri });

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`));
      }

      if (networkError) { console.log(`[Network error]: ${networkError}`); }
    });

    apollo.create({
      link: ApolloLink.from([
        linkError,
        http
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production
    });
  }

}
