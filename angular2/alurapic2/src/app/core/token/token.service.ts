import { Injectable } from '@angular/core';

const KEY = 'authToken'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken(): boolean { return !!this.getToken() }

  setToken(token: string): void {
    window.localStorage.setItem(KEY, token);
  }

  getToken(): string { return window.localStorage.getItem(KEY); }

  removeToken(): void { window.localStorage.removeItem(KEY); }
}
