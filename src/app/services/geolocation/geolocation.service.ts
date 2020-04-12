import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {

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
}
