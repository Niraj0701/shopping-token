import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  
  getShopList(type: string, lat: number, long: number) {
    const url = "https://api.healthybank.in/api/businesses";
  let params: any = {
    params: {
      business_type: type
    }
  };
  if (lat && long) {
    params = {
      params: {
        business_type: type,
        latitude: lat,
        longitude: long
      }
    };
  }
    return this.http.get(url, params);
  }
}