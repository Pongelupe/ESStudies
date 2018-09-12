import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Router
} from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: LoginRoutingModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    // route.path
    const url = window.location.pathname;
    return this.checkAuthState(url)
      .pipe(take(1));
  }

  private checkAuthState(url: string): Observable<boolean> {
    return this.authService.isAuthenticated
      .pipe(
        tap(is => {
          if (!is) {
            this.authService.redirectUrl = url;
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
