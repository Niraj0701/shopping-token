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

  tt: any;
  constructor(
    private storage: Storage,
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem("user_name");
    this.userMobile = localStorage.getItem("mobile");
    this.pages = [
      {
        title: "View businesses",
        url: "/menu/view-businesses",
        isConsumer: !this.isBusinessProvider(),
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
    this.initMenu();
  }

  private isConsumer() {
    return localStorage.getItem("user_type") == "Consumer";
  }

  initMenu() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
      this.menu.close();
    });
  }

  isBusinessProvider() {
    return localStorage.getItem("user_type") == "ServiceProvider";
  }

  logout() {
    localStorage.clear();
    this.storage.clear();
    this.router.navigate(["/login"]);
  }

  openEnd() {
    this.menu.close();
  }
}