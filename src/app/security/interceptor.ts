import { Injectable } from '@angular/core';
import { Observable, throwError, from, of } from 'rxjs';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private _router: Router, public http: HttpClient) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return of(localStorage.getItem('authorization'))
         .pipe(
            switchMap(token => {
               if (token) {
                  request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
               }

               return next.handle(request).pipe(
                  map((event: HttpEvent<any>) => {
                     if (event instanceof HttpResponse) {
                        // do nothing for now
                     }
                     return event;
                  }),
                  catchError((error: HttpErrorResponse) => {
                     const status = error.status;
                     const reason = error && error.error.reason ? error.error.reason : '';

                     // this.presentAlert(status, reason);
                     return throwError(error);
                  })
               );
            })
         );
   }
}
