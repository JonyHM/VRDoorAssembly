import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { CurrentUserService } from '../services/current-user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (this.tokenService.hasToken()) {
      if (this.currentUserService.tokenIsValid()) {
        const token = this.tokenService.getToken();
        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });

      } else {
        this.currentUserService.getUser()
          .subscribe(usr => {
            this.tokenService.refreshToken(usr.id);
          }
        );
      }
    }

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            if(event.headers.get('Authorization') !== null) {
              this.currentUserService.setToken(event.headers.get('Authorization'));
            }
          }
        }, error => {
          console.error(error.status);
          console.error(error.message);
        })
      );
  }
}
