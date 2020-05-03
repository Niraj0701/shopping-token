import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Storage } from "@ionic/storage";
import { StorageGetService } from "../api/storageGet.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: Storage,
    private storageGetService: StorageGetService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Promise.all([
      this.storageGetService.getKey("mobile"),
      this.storageGetService.getKey("authorization"),
    ]).then(([mobile, auth]) => {
      if (mobile != null && auth != null) {
        return true;
      } else {
        this.router.navigate(["/login"]);
      }
    });
  }
}
