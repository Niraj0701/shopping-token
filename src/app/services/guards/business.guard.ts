import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { Storage } from '@ionic/storage';

@Injectable()
export class BusinessGuard implements CanLoad {
  constructor(private router: Router, private storage: Storage) {}

  canLoad(route: Route) {
    let user_type = false;
    this.storage.get("user_type").then(response => {
      if (response === "ServiceProvider") {
        user_type = true;
      }
    });

    if(!user_type) {
      this.router.navigate(["/menu/user-services"]);
      return;
    }
    return user_type;
  }
}
