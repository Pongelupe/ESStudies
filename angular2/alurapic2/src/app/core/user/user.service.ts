import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private _userName: string;

  constructor(private _tokenService: TokenService) {

    this._tokenService.hasToken() && this.decodeAndNotify();

  }

  setToken(token: string) {
    this._tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(): Observable<User> { return this.userSubject.asObservable(); }

  private decodeAndNotify() {
    const token = this._tokenService.getToken();
    const user = jwt_decode(token) as User;
    this._userName = user.name;
    this.userSubject.next(user);
  }

  logout() {
    this._tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged(): boolean {
    return this._tokenService.hasToken();
  }

  get userName() {
    return this._userName;
  }

}
