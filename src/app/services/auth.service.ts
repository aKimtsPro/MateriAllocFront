import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export interface Auth {
  token: string,
  refreshToken: string;
  username: string;
  roles: string[];
}

export interface LoginForm {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL: string = "http://localhost:8080/api/auth"
  private readonly AUTH_STORAGE_KEY = "user_data";
  constructor(private readonly _client: HttpClient) { }

  login(form: LoginForm): Observable<Auth>{
    return this._client.post<Auth>(`${this.BASE_URL}/login`, form).pipe(
      tap( data => {
        this.user = data;
        console.log( this.user );
      } )
    )
  }

  logout(){
    this.user = undefined;
  }

  get user(): Auth | undefined {
    const userJson = localStorage.getItem(this.AUTH_STORAGE_KEY)
    if( userJson )
      return JSON.parse( userJson );

    return undefined;
  }

  private set user(user: Auth | null | undefined){
    if( !user )
      localStorage.removeItem(this.AUTH_STORAGE_KEY);

    localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  get isConnected(){
    return this.user !== undefined
  }

}
