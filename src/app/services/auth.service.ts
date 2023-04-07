import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, finalize, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

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

@Injectable()
export class AuthService {

  private readonly BASE_URL: string = "http://localhost:8080/api/auth"
  private readonly AUTH_STORAGE_KEY = "user_data";
  private readonly _connectedSubject= new BehaviorSubject(this.connected)
  constructor(private readonly _client: HttpClient, private readonly _router: Router) { }

  login(form: LoginForm): Observable<Auth>{
    return this._client.post<Auth>(`${this.BASE_URL}/login`, form).pipe(
      tap( data => {
        this.user = data;
        this._connectedSubject.next( this.connected );
      }),
      catchError( (err) => {throw new Error(err.message);}),
      finalize( () => {
        console.log(this.user)
        if( this.user?.roles.includes("ROLE_ADMIN") )
          this._router.navigateByUrl("/request/pending")
      })
    )
  }

  logout(){
    this.user = undefined;
    this._connectedSubject.next( this.connected );
    this._router.navigateByUrl("/home");
  }

  get user(): Auth | undefined {
    const userJson = localStorage.getItem(this.AUTH_STORAGE_KEY)

    if( userJson )
      return JSON.parse( userJson );

    return undefined;
  }

  private set user(user: Auth | null | undefined){
    console.log(typeof user);

    if( !user)
      localStorage.removeItem(this.AUTH_STORAGE_KEY);
    else
      localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  get connected(){
    return this.user !== undefined
  }

  get connected$() {
    return this._connectedSubject.asObservable();
  }

}
