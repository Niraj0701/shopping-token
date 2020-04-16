import { ICoords } from './../../models/shop.interface';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GeolocationService {

  userCoords: Subject<ICoords> = new Subject();
  constructor() { }

  getCurrentLocation () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
        /* resolve({
          lat: 18.5673,
          long: 73.7699
        }); */
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    });
  }

  watchUserLocation(): Observable<Object> {
    return Observable.create(observer => {
      navigator.geolocation.watchPosition(position => {
        observer.next(position);
      })
    })
  }
}
