import { Injectable, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class UserHttpService {

  public token = '';
  public endpoint = '/api/users';
  private renewClock;
  private renewClockInterval;

  constructor( private http: HttpClient, private router: Router ) {
    console.log('User service instantiated');
    // ! TEMP - COMMENT THIS TWO LINES BEFORE DEPLOY
    console.log(sessionStorage.getItem('restOnedToken'));
    console.log(this.token = sessionStorage.getItem('restOnedToken'));
    setTimeout(() => {
      this.refreshAll();
    }, 50);
  }

  private setToken(token) {
      this.token = token;
      sessionStorage.setItem('restOnedToken', this.token);
      const decodeToken = jwt_decode(this.token);
      const expiredDate = decodeToken.iat * 1000 + Math.floor((decodeToken.exp - decodeToken.iat) * 1000 * 0.9);
      const now = new Date().getTime();
      if (expiredDate - now > 0) {
        this.renewClockInterval = expiredDate - now;
        this.renewClock = setInterval(() => {this.renew().subscribe((data) => {
          // tslint:disable-next-line: no-shadowed-variable
          const decodeToken = jwt_decode(data.token);
          this.token = data.token;
          sessionStorage.setItem('restOnedToken', data.token);
        }, () => {this.logout(); }); }, this.renewClockInterval);
      } else {
        this.logout();
      }
  }
  private refreshAll() {
    this.renew().subscribe((data) => {
      this.setToken(data.token);
    // tslint:disable-next-line: no-unused-expression
    }), () => { this.logout(); };
  }

  login( username: string, password: string): Observable<any> {
    const selector = {
      headers: new HttpHeaders({
        authorization: 'Basic' + btoa( username + ':' + password),
      })
    };
    return this.http.get('/api/users/login', selector).pipe(
      tap((data) => {
        this.setToken(data.token);
      })
    );
  }

  public renew(): Observable<any> {
    const token = sessionStorage.getItem('restOnedToken');
    if (!token || token.length < 1) {
      return throwError({error : {errormessage: 'No token found'}});
    }
    return this.http.get('/api/users/renew');
  }

  logout() {
    this.token = '';
    sessionStorage.removeItem('restOnedToken');
    clearInterval(this.renewClock);
    this.router.navigate(['/']);
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {

    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

    clearInterval(this.renewClock);
  }
  register( user ): Observable<any> {
    return this.http.post(this.endpoint, user);
  }
  getToken() {
    this.token = sessionStorage.getItem('restOnedToken');
    // console.log(this.token);
    return this.token;
  }

  getUsername() {
    return jwt_decode(this.token).username;
  }

  getRole() {
    console.log(this.token);
    return jwt_decode(this.token).role;
  }

  getUsers() {

    return this.http.get(this.endpoint);
  }

  deleteUser(userToDelete) {

    return this.http.delete(this.endpoint + '/' + userToDelete);
  }
}
