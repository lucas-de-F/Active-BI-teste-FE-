import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token') as string
        const user: any = jwtDecode(token);
        const tokenExpired = Date.now() >= user.exp * 1000;
        console.log(tokenExpired)
      if (!token || tokenExpired) {
        localStorage.clear();
        this.router.navigate(['/auth/sign-in'])
        return false;
      }
      if (route.data['expectedRoles'].includes(user.roleName)) {
        return true
      }

      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['/auth/sign-in'])
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
}
