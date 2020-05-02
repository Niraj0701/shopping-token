import { Router, RouterEvent } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {

  selectedPath: any;
  pages: any;
  userName: any;
  userMobile: any;
  user_type: any;

  constructor(
    private storage: Storage,
    private router: Router,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.initMenu();
  }

  ionViewWillEnter() {

    Promise.all([
      this.storage.get("user_name"),
      this.storage.get("mobile"),
      this.storage.get("user_type")])
      .then(([userName, userMobile, userType]) => {
        this.userName = userName;
        this.userMobile = userMobile;
        this.user_type = userType;
        this.pages = [
          {
            title: "View businesses",
            url: "/menu/view-businesses",
            isConsumer: !(userType == "ServiceProvider"),
          },
          {
            title: "View services",
            url: "/menu/user-services",
            isConsumer: false,
          },
          {
            title: "My Booked Slots",
            url: "/menu/my-booked-slots",
            isConsumer: false,
          },
        ];
      });
  }

  initMenu() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
      this.menu.close();
    });
  }

  isBusinessProvider() {
    return this.user_type == "ServiceProvider";
  }

  logout() {
    Promise.all([this.storage.remove('mobile'),
      this.storage.remove('authorization'),
      this.storage.remove('user_type'),
      this.storage.remove('user_name'),
      this.storage.remove('refresh'),
      this.storage.remove('refresh')
     ]).then( () => {
       this.router.navigate(["/login"]);
     });
  }  

  openEnd() {
    this.menu.close();
  }
}
