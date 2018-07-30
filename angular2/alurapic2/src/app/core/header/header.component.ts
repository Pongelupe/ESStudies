import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>;

  constructor(private _userService: UserService, private _router: Router) {
  }

  ngOnInit() {
    this.user$ = this._userService.getUser();
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['']);
  }

}
