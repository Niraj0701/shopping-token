import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  
  getShopList(type: string, lat: number, long: number) {
    const url = "https://api.healthybank.in/api/businesses/";
  let params: any = {
    params: {
      business_type: type
    }
  };
  if (lat && long) {
    params = {
      params: {
        latitude: lat,
        longitude: long,
        business_type: type
      }
    };
  }
    return this.http.get(url, params);
  }

  signIn(mobileNumber: string, pass: string) {
    const url = "https://api.healthybank.in/api/signin/";
    const body = {
      "mobile": mobileNumber,
      "password": pass
    }

    return this.http.post(url, body);

  }

  signup(person: any) {
    const url = "https://api.healthybank.in/api/users/";
    const body = {
      "name": person.name? person.name: '',
      "email": person.email? person.email : '',
      "mobile": person.mobile,
      "profile": person.profile,
      "password": person.password
    }
    
    return this.http.post(url, body);
  }
}