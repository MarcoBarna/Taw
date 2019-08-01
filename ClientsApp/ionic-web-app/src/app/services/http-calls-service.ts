import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserHttpService } from './users-http-service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private base_url = environment.base_url;

  constructor(private us: UserHttpService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Intercepted Request at  :'  + req.url);

    const effReq = req.clone({
      url: this.base_url + req.url,
      headers: ((req.url !== 'login') ? req.headers.set('authorization', 'Bearer ' + this.us.getToken())
      .set('Content-Type', 'application/json') : req.headers.set('Content-Type', 'application/x-www-form-urlencoded'))
        .set('cache-control', 'no-cache')
    });

    return next.handle(effReq);
  }
}