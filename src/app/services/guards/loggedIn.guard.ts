import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class LoggedInGuard implements CanActivate {
   constructor(private router: Router, private storage: Storage) { }

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