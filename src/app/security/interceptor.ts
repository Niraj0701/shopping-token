import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private _router: Router,
      public http: HttpClient,
      public alertController: AlertController,
      private storage: Storage) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return from(this.storage.get('authorization'))
         .pipe(
            switchMap(token => {
               if (token) {
                  request = request.clone({ headers: request.headers.set('authorization', 'Bearer ' + token) });
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
                     const reason = error && error.error.detail ? error.error.detail : "Problem in connecting to backend";
                     this.presentAlert(reason, status);
                     // this.presentAlert(status, reason);
                     return throwError(error);
                  })
               );
            })
         );
   }


   async presentAlert(reason: string, status: number) {
      const alert = await this.alertController.create({
        header: "Error",
        subHeader: status.toString(),
        message: reason,
        buttons: ['OK']
      });
  
      await alert.present();
    }
}
