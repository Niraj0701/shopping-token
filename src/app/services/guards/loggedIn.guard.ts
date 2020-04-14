/* import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanLoad {
   constructor(private router: Router) { }

   canLoad(route: Route) {
      debugger;
      if(localStorage['user'] && localStorage['password']){
         return true;
      } else {
         this.router.navigate(['/login']);
      }
   }

   
} 

*/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {
   constructor(private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage['mobile'] && localStorage['authorization']) {
         return true;
      } else {
         this.router.navigate(['/login']);
      }
   }
}