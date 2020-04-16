import { ICoords } from './../models/shop.interface';
import { GeolocationService } from './../services/geolocation/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderService } from '../services/api/loading.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.page.html',
  styleUrls: ['./user-services.page.scss'],
})
export class UserServicesPage implements OnInit {

  private userCoords: any = {};
  lat: any;
  long: any;
  public buttonType = 'outline';
  public buttinText = 'Use Current Location?';
  constructor(public router: Router,
    public alertController: AlertController,
    private loading: LoaderService,
    private geolocation: GeolocationService) { }


  ngOnInit() {
    this.checkUserPreference();
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
    this.router.navigate(['/shops-list'], { state: { type: business_type, coords: this.userCoords } })
  }

  checkUserPreference() {
    console.log(JSON.parse(localStorage.getItem('useCurrentLocation')));
    if (localStorage.getItem('useCurrentLocation') &&
      localStorage.getItem('lat') &&
      localStorage.getItem('long')) {
      this.alreadyHaveCoords();
    } else {
      this.presentAlertConfirm2();
    }
  }

  alreadyHaveCoords() {
    const _coords: ICoords = {
      latitude: parseInt(localStorage.getItem('lat')),
      longitude: parseInt(localStorage.getItem('long'))
    }
    this.buttinText = 'Using Current Location';
    this.buttonType = 'solid';

    this.geolocation.userCoords.next(_coords);
  }

  useCurrentLocation() {
    if (!localStorage.getItem('useCurrentLocation')) {
      this.presentAlertConfirm();
    }
    const data = this.geolocation.watchUserLocation().then(data => {
      console.log('***: ', data);
      const _coords: ICoords = {
        latitude: data['coords'].latitude,
        longitude: data['coords'].longitude
      }
      this.geolocation.userCoords.next(_coords);
      this.userCoords['lat'] = data['coords'].latitude;
      this.userCoords['long'] = data['coords'].longitude;
      localStorage.setItem('lat', data['coords'].latitude.toString());
      localStorage.setItem('long', data['coords'].longitude.toString());
      this.buttonType = 'solid';
      this.buttinText = 'Using Current Location'
      this.loading.dismiss();
    }) ;
      
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Need Location',
      message: `<strong>Need to get your current location to list all stores near you...</strong>!!!`,
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
            this.loading.present();
            this.useCurrentLocation();
          }
        }
      ]
    });

    await alert.present();
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
