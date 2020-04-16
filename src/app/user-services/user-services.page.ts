import { ICoords } from './../models/shop.interface';
import { GeolocationService } from './../services/geolocation/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.page.html',
  styleUrls: ['./user-services.page.scss'],
})
export class UserServicesPage implements OnInit {

  private userCoords: any = {};
  lat: any;
  long: any;
  constructor(public router: Router,
    public alertController: AlertController,
    private geolocation: GeolocationService) { }


  ngOnInit() {
    this.checkUserPreference();
    this.geolocation.userCoords.subscribe(data => {
      this.presentAlertConfirm2();
    });

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Save preference',
      message: '<strong>Do you want to save your current location bydefault ?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            localStorage.setItem('useCurrentLocation', 'true');
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToList(business_type: string) {
    console.log('***')
    this.router.navigate(['/shops-list'], { state: {type:business_type,  coords: this.userCoords } })
  }

  checkUserPreference() {
    console.log(JSON.parse(localStorage.getItem('useCurrentLocation')));
    if (localStorage.getItem('useCurrentLocation')) {
      console.log('User said yes.....');
      this.useCurrentLocation();
    }
  }

  useCurrentLocation() {
    if (!localStorage.getItem('useCurrentLocation')) {
      this.presentAlertConfirm();
    }
    this.geolocation.watchUserLocation().subscribe(data => {
      console.log('***: ', data);
      this.lat = data['coords'].latitude;
      this.long = data['coords'].longitude;
      const _coords: ICoords = {
        latitude: data['coords'].latitude,
        longitude: data['coords'].longitude
      }
      this.geolocation.userCoords.next(_coords);
      this.userCoords['lat'] = data['coords'].latitude;
      this.userCoords['long'] = data['coords'].longitude;

    })
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Save preference',
      message: `<strong>Lat: ${this.lat} - Long: ${this.long}</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            localStorage.setItem('useCurrentLocation', 'true');
          }
        }
      ]
    });

    await alert.present();
  }

}
