import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.page.html',
  styleUrls: ['./user-services.page.scss'],
})
export class UserServicesPage implements OnInit {

  constructor(public navCtrl: NavController, public router: Router) { }

  ngOnInit() {
  }

  navigateToList() {
    console.log('***')
    //this.navCtrl.navigateForward('/shops-list')
    this.router.navigate(['shops-list'])
  }

}
