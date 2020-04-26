import { Router, RouterEvent } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  selectedPath: any;
  pages: any;

  tt: any;
  constructor(private router: Router, private menu: MenuController) {}

  ngOnInit() {
    this.pages = [
      {
        title: "user-services",
        url: "/menu/user-services",
        isConsumer: this.isConsumer(),
      },
      {
        title: "view-businesses",
        url: "/menu/view-businesses",
        isConsumer: !this.isConsumer(),
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

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  openEnd() {
    this.menu.close();
  }
}
