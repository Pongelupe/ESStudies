import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private _userService: UserService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this._userService.isLogged()) {
            this._router.navigate(['user', this._userService.userName]);
            return false;
        }
        return true;
    }

}