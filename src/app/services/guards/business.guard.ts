import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";

@Injectable()
export class BusinessGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route) {
    if (localStorage.getItem("user_type") === "service_provider") {
      return true;
    } else {
      this.router.navigate(["/user-services"]);
    }
  }
}
