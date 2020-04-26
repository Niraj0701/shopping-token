import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: "profile",
      url: '/menu/profile',
      isConsumer: localStorage.getItem('user_type') === 'Consumer'
    },
    {
      title: 'business-profile',
      url: '/menu/business-profile',
      isConsumer: localStorage.getItem('user_type') === 'ServiceProvider'
    },
    {
      title: 'user-services',
      url: '/menu/user-services',
      isConsumer: localStorage.getItem('user_type') === 'Consumer'
    },
    {
      title: 'complete-profile',
      url: '/menu/complete-profile',
      isConsumer: localStorage.getItem('user_type') === 'ServiceProvider'
    },
    {
      title: 'view-businesses',
      url: '/menu/view-businesses',
      isConsumer: localStorage.getItem('user_type') === 'ServiceProvider'
    }
  ]

  selectedPath: any

  tt: any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.initMenu();
  }

  initMenu() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}
