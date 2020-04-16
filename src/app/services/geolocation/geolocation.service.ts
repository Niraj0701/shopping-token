import { ICoords } from './../../models/shop.interface';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Plugins } from '@capacitor/core';

 const { Geolocation } = Plugins;
 
@Injectable()
export class GeolocationService {

  userCoords: Subject<ICoords> = new Subject();
  constructor() { }

  getCurrentLocation () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
        /* resolve({
          lat: 18.5673,
          long: 73.7699
        }); */
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    });
  }

  async watchUserLocation() {
    
    const coords = await Geolocation.getCurrentPosition();
      console.log('***SERVICE GEO***: ', coords);
      return coords;
  }
}
