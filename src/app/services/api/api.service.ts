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

  signIn(mobileNumber: string, pass: string) {
    const url = "https://api.healthybank.in/api/signin/";
    const body = {
      "mobile": mobileNumber,
      "password": pass
    }

    return this.http.post(url, body);

  }

  signup(mobile: string, password: string, profile: string, email?: string, name?: string, ) {
    const url = "https://api.healthybank.in/api/users/";
    const body = {
      "name": name? name: '',
      "email": email? email : '',
      "mobile": mobile,
      "profile": profile,
      "password": password
    }
    
    return this.http.post(url, body);
  }
}