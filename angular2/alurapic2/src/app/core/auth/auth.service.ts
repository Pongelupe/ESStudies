import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _userService : UserService) { }

  authenticate(userName: string, password: string) {
    return this._http.post(API_URL + '/user/login', { userName, password }, { observe: 'response' })
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this._userService.setToken(authToken);
      }));
  }
}
