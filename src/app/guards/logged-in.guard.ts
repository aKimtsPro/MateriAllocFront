import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor( private readonly _authService: AuthService, private readonly _router: Router) {}

  canActivate(): boolean {
    if( !this._authService.connected )
      this._router.navigateByUrl("/home")

    return this._authService.connected;
  }

}


export const LOGGED_GUARD: CanActivateFn = function () {
  const authService = inject(AuthService);
  const router = inject(Router);

  if( !authService.connected )
    router.navigateByUrl("/login");

  return authService.connected;
}

export const NOT_LOGGED_GUARD: CanActivateFn =function () {
  const authService = inject(AuthService);
  const router = inject(Router);

  if( authService.connected )
    router.navigateByUrl("/home");

  return !authService.connected;
}
