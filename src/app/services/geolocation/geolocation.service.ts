import { ICoords } from "./../../models/shop.interface";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable()
export class GeolocationService {
  userCoords: Subject<ICoords> = new Subject();
  constructor(private geolocation: Geolocation) { }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        });
        /* resolve({
          lat: 18.5673,
          long: 73.7699
        }); */
      } else {
      }
    });
  }

  watchUserLocation(): Observable<Object> {
    return Observable.create(observer => {
      this.geolocation.getCurrentPosition().then(position => {
       
        observer.next(position);
      }).catch( error => {
        observer.next(error);
      })
    })
  }
}
