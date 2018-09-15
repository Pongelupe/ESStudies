import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Base64 } from 'js-base64';
import { Observable, ReplaySubject, throwError, of } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { AUTHENTICATE_USER_MUTATION, SIGNUP_USER_MUTATION, LoggedInUserQuery, LOGGED_IN_USER_QUERY } from './auth.graphql';
import { Router } from '@angular/router';
import { StorageKeys } from '../../storage-keys';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: User;
  redirectUrl: string;
  keepSigned: boolean;
  rememberMe: boolean;
  private _isAuthenticated = new ReplaySubject<boolean>(1);

  constructor(private apollo: Apollo, private router: Router) {
    this.init();
  }

  init(): void {
    this.keepSigned = JSON.parse(window.localStorage.getItem(StorageKeys.KEEP_SIGNED));
    this.rememberMe = JSON.parse(window.localStorage.getItem(StorageKeys.REMEMBER_ME));
  }

  get isAuthenticated(): Observable<boolean> { return this._isAuthenticated.asObservable(); }

  signinUser(variables: { email: string, password: string }): Observable<{ id: string, token: string }> {
    return this.apollo.mutate({
      mutation: AUTHENTICATE_USER_MUTATION,
      variables
    }).pipe(
      map(res => res.data.authenticateUser),
      tap(res => this.setAuthState({ id: res && res.id, token: res && res.token, isAuthenticated: res !== null })),
      catchError(err => {
        this.setAuthState({ id: null, token: null, isAuthenticated: false });
        return throwError(err);
      })
    );
  }

  signupUser(variables: { name: string, email: string, password: string }): Observable<{ id: string, token: string }> {
    return this.apollo.mutate({
      mutation: SIGNUP_USER_MUTATION,
      variables
    }).pipe(
      map(res => res.data.signupUser),
      tap(res => this.setAuthState({ id: res && res.id, token: res && res.token, isAuthenticated: res !== null }),
        catchError(err => {
          this.setAuthState({ id: null, token: null, isAuthenticated: false });
          return throwError(err);
        })
      ));
  }

  toggleKeepSigned(): void {
    this.keepSigned = !this.keepSigned;
    window.localStorage.setItem(StorageKeys.KEEP_SIGNED, this.keepSigned.toString());
  }

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
    window.localStorage.setItem(StorageKeys.REMEMBER_ME, this.rememberMe.toString());
    if (!this.rememberMe) {
      window.localStorage.removeItem(StorageKeys.USER_EMAIL);
      window.localStorage.removeItem(StorageKeys.USER_PASSWORD);
    }
  }

  setRememberMe(user: { email: string, password: string }): void {
    if (this.rememberMe) {
      window.localStorage.setItem(StorageKeys.USER_EMAIL, Base64.encode(user.email));
      window.localStorage.setItem(StorageKeys.USER_PASSWORD, Base64.encode(user.password));
    }
  }

  getRememberMe(): { email: string, password: string } {
    return this.rememberMe ? {
      email: Base64.decode(window.localStorage.getItem(StorageKeys.USER_EMAIL)),
      password: Base64.decode(window.localStorage.getItem(StorageKeys.USER_PASSWORD))
    } : null;
  }

  logout(): void {
    window.localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    window.localStorage.removeItem(StorageKeys.KEEP_SIGNED);
    this.keepSigned = false;
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
    this.apollo.getClient().resetStore();
  }

  autoLogin(): Observable<void> {
    if (!this.keepSigned) {
      this._isAuthenticated.next(false);
      window.localStorage.removeItem(StorageKeys.AUTH_TOKEN);
      return of();
    }
    return this.validateToken()
      .pipe(
        tap(authData => {
          const token = window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
          this.setAuthState({ id: authData.id, token, isAuthenticated: authData.isAuthenticated });
        }),
        mergeMap(res => of()),
        catchError(err => {
          this.setAuthState({ id: null, token: null, isAuthenticated: false });
          return throwError(err);
        })
      );
  }


  private validateToken(): Observable<{ id: string, isAuthenticated: boolean }> {
    return this.apollo.query<LoggedInUserQuery>({
      query: LOGGED_IN_USER_QUERY
    }).pipe(
      map(res => {
        const user = res.data.loggedInUser;
        return {
          id: user && user.id,
          isAuthenticated: user !== null
        };
      })
    );
  }

  private setAuthState(authData: { id: string, token: string, isAuthenticated: boolean }): void {
    if (authData.isAuthenticated) {
      window.localStorage.setItem(StorageKeys.AUTH_TOKEN, authData.token);
      this.authUser = {id: authData.id};
    }
    this._isAuthenticated.next(authData.isAuthenticated);
  }
}
