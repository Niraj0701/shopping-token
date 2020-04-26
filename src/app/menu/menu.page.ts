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
  constructor(private router: Router, private menu: MenuController) { }

  ngOnInit() {
    
    this.pages = [
      {
        title: "Businesses",
        url: "/menu/view-businesses",
        isConsumer: !this.isBusinessProvider(),
      },
      {
        title: "Services",
        url: "/menu/user-services",
        isConsumer: false,
      }
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
    return localStorage.getItem("user_type") == 'ServiceProvider';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  openEnd() {
    this.menu.close();
  }
}
