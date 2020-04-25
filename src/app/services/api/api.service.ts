import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class ApiService {
  userProfile: Subject<any> = new Subject();
  constructor(private http: HttpClient) {}

  getShopList(type: string, lat: number, long: number) {
    const url = "https://api.healthybank.in/api/businesses/";
    let params: any = {
      params: {
        business_type: type,
      },
    };
    if (lat && long) {
      params = {
        params: {
          latitude: lat,
          longitude: long,
          business_type: type,
        },
      };
    }
    return this.http.get(url, params);
  }

  signIn(mobileNumber: string, pass: string) {
    const url = "https://api.healthybank.in/api/signin/";
    const body = {
      mobile: mobileNumber,
      password: pass,
    };

    return this.http.post(url, body);
  }

  signup(person: any) {
    const url = "https://api.healthybank.in/api/users/";
    const body = {
      name: person.name ? person.name : "",
      email: person.email ? person.email : "",
      mobile: person.mobile,
      profile: person.profile,
      password: person.password,
    };

    return this.http.post(url, body);
  }

  bookNowSlot(bookDetails: any) {
    const url = `https://api.healthybank.in/api/business/${bookDetails.id}/slots`;
    const body = {
      date: bookDetails.selectedDate,
      slot: bookDetails.selectedTime,
      customer_name: bookDetails.name,
    };

    return this.http.post(url, body);
  }

  me() {
    const url = "https://api.healthybank.in/api/me/";

    return this.http.get(url);
  }

  completeProfile(profile: any) {
    const url = "https://api.healthybank.in/api/businesses/";

    return this.http.post(url, profile);
  }
}
