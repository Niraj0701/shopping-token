import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";

@Injectable()
export class BusinessGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route) {
    alert(localStorage.getItem("user_type"))
    if (localStorage.getItem("user_type") === "ServiceProvider") {
      alert('====')
      return true;
    } else {
      this.router.navigate(["/menu/user-services"]);
    }
  }
}
