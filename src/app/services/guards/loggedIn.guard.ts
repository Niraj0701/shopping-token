import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class LoggedInGuard implements CanActivate {
   constructor(private router: Router, private storage: Storage) { }

   /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage['mobile'] && localStorage['authorization'] && this.isConsumer()) {
         return true;
      } else if (localStorage['mobile'] && localStorage['authorization'] && !this.isConsumer()) {
         this.router.navigate(['/menu/view-businesses']);
         return;
      }
      this.router.navigate(['/login']);
   } */

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
      return Promise.all([this.storage.get('mobile'), this.storage.get('authorization')])
      .then(([mobile, auth]) => {
         if(mobile != null && auth != null) {
            return true;
         } else {
            this.router.navigate(['/login']);
         }
      });
   }
}