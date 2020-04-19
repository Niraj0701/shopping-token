import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";
import { GeolocationService } from "./../services/geolocation/geolocation.service";

@Component({
  selector: "app-complete-profile",
  templateUrl: "./complete-profile.page.html",
  styleUrls: ["./complete-profile.page.scss"],
})
export class CompleteProfilePage implements OnInit {
  completeProfile: FormGroup;
  private userCoords: any = {};
  constructor(
    private loading: LoaderService,
    private router: Router,
    private apiService: ApiService,
    public alertController: AlertController,
    private geolocation: GeolocationService
  ) {}

  ngOnInit() {
    this.apiService.userProfile.subscribe((user) => {});
    this.completeProfile = new FormGroup({
      name: new FormControl("", [Validators.required]),
      business_type: new FormControl("", [Validators.required]),
      users_allowed: new FormControl("", [Validators.required]),
      slot_size_min: new FormControl("", [Validators.required]),
      latitude: new FormControl("", [Validators.required]),
      longitude: new FormControl("", [Validators.required]),
      start_time: new FormControl("", [Validators.required]),
      end_time: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    let obj = {
      ...this.completeProfile.value,
    };

    console.log("in complete profile", this.completeProfile.value, obj);
    this.loading.show();
    this.apiService.completeProfile(obj).subscribe(
      (data) => {
        this.loading.hide();
        localStorage.setItem("isCompleteProfile", "true");
        this.router.navigate(["/business-profile"]);
      },
      (err) => {
        this.loading.hide();
        localStorage.setItem("isCompleteProfile", "false");
      }
    );
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Save preference",
      message:
        "<strong>Do you want to save your current location bydefault ?</strong>!!!",
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
            console.log("Confirm Okay");
            localStorage.setItem("useCurrentLocation", "true");
          },
        },
      ],
    });

    await alert.present();
  }
  useCurrentLocation() {
    if (!localStorage.getItem("useCurrentLocation")) {
      this.presentAlertConfirm();
    }
    this.geolocation.watchUserLocation().subscribe(
      (data) => {
        console.log("***: ", data);
        const _coords = {
          latitude: data["coords"].latitude,
          longitude: data["coords"].longitude,
        };
        this.geolocation.userCoords.next(_coords);
        this.userCoords["lat"] = data["coords"].latitude;
        this.userCoords["long"] = data["coords"].longitude;
        localStorage.setItem("lat", data["coords"].latitude);
        localStorage.setItem("long", data["coords"].longitude);
        this.loading.hide();
      },
      (error) => {
        console.log("GEO LOCA ERROR ; ", error);
        this.loading.hide();
      }
    );
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: "Need Location",
      message: `<strong>Need to get your current location to list all stores near you...</strong>!!!`,
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
            console.log("Confirm Okay");
            localStorage.setItem("useCurrentLocation", "true");
            this.loading.show();
            this.useCurrentLocation();
          },
        },
      ],
    });

    await alert.present();
  }
}