import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment.prod';
import { ApolloLink, Operation } from 'apollo-link';
import { StorageKeys } from './storage-keys';
import { GRAPHCOOL_CONFIG, GraphcoolConfig } from './core/providers/graphcool-config.provider';

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

  constructor(
    private apollo: Apollo,
    @Inject(GRAPHCOOL_CONFIG) private graphcolConfig: GraphcoolConfig,
    private httpLink: HttpLink) {
      
    const uri = this.graphcolConfig.simpleAPI;
    const http = httpLink.create({ uri });

    const authMiddleware: ApolloLink = new ApolloLink((operation: Operation, forward) => {

      operation.setContext({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}`
        })
      });

      return forward(operation);
    });

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
        authMiddleware.concat(http)
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production
    });
  }

  private getAuthToken(): string {
    return window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }

}
