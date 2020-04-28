import { ICoords } from "./../models/shop.interface";
import { GeolocationService } from "./../services/geolocation/geolocation.service";
import { Component, OnInit } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { LoaderService } from "../services/api/loading.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-user-services",
  templateUrl: "./user-services.page.html",
  styleUrls: ["./user-services.page.scss"],
})
export class UserServicesPage implements OnInit {
  private userCoords: any = {};
  lat: any;
  long: any;
  public buttonType = "outline";
  public buttinText = "Use Current Location?";
  constructor(
    private storage: Storage,
    public router: Router,
    public alertController: AlertController,
    private loading: LoaderService,
    private geolocation: Geolocation,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    //this.checkUserPreference();
    this.useCurrentLocation();
  }

  ionViewWillEnter() {
    this.useCurrentLocation();
  }

  logout(event) {
    localStorage.clear();
    this.storage.clear();
    this.router.navigate(["/login"]);
  }

  async presentAlertConfirm(message: string) {
    const alert = await this.alertController.create({
      header: "Save preference",
      message: `<strong>${message}</strong>!!!`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "danger",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            localStorage.setItem("useCurrentLocation", "true");
            this.storage.set("useCurrentLocation", "true");
          },
        },
      ],
    });

    await alert.present();
  }

  navigateToList(business_type: string) {
    this.router.navigate(["/menu/shops-list"], {
      state: { type: business_type, coords: this.userCoords },
    });
  }

  checkUserPreference() {
    if (
      localStorage.getItem("useCurrentLocation") &&
      localStorage.getItem("lat") &&
      localStorage.getItem("long")
    ) {
      this.alreadyHaveCoords();
    } else {
      this.presentAlertConfirm2();
    }
  }

  alreadyHaveCoords() {
    const _coords: ICoords = {
      latitude: parseInt(localStorage.getItem("lat")),
      longitude: parseInt(localStorage.getItem("long")),
    };
    this.buttinText = "Using Current Location";
    this.buttonType = "solid";

    this.geolocationService.userCoords.next(_coords);
  }

  useCurrentLocation() {
    this.loading.show();
    /* if (!localStorage.getItem('useCurrentLocation')) {
      this.presentAlertConfirm2();
    } */
    this.geolocation
      .getCurrentPosition({ enableHighAccuracy: true })
      .then((data) => {
        const _coords: ICoords = {
          latitude: data["coords"].latitude,
          longitude: data["coords"].longitude,
        };
        this.geolocationService.userCoords.next(_coords);
        this.userCoords["lat"] = data["coords"].latitude;
        this.userCoords["long"] = data["coords"].longitude;
        localStorage.setItem("lat", data["coords"].latitude.toString());
        this.storage.set("lat", data["coords"].latitude.toString());
        localStorage.setItem("long", data["coords"].longitude.toString());
        this.storage.set("long", data["coords"].longitude.toString());
        this.buttonType = "solid";
        this.buttinText = "Using Current Location";
        this.loading.show();
      })
      .catch((error) => {
        this.loading.hide();
      });
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: "Need Location",
      message: `<strong>Need to get your current location to list all stores near you...</strong>!!!`,
      buttons: [
        {
          text: "Block",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Allow",
          handler: () => {
            localStorage.setItem("useCurrentLocation", "true");
            this.storage.set("useCurrentLocation", "true");
            this.loading.show();
            this.useCurrentLocation();
          },
        },
      ],
    });
    await alert.present();
  }
}
