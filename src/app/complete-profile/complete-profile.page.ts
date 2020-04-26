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

  getCoords(event) {
    console.log("**** : ", event);
    this.completeProfile.controls["latitude"].setValue(event.lat);
    this.completeProfile.controls["longitude"].setValue(event.long);
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
        this.apiService.me().subscribe((data) => {
          this.router.navigate(["/menu/view-businesses"], {
            state: { businesses: data },
          });
        });
      },
      (err) => {
        this.loading.hide();
        localStorage.setItem("isCompleteProfile", "false");
      }
    );
  }
}
