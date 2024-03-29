import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("interceptor doing work")

    const user = this._authService.user;

    if( user ){
      const authReq = request.clone({
        headers: request.headers.set("Authorization", user.token)
      })

      return next.handle(authReq);
    }


    return next.handle(request);
  }
}
