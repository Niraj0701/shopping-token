import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ApiService } from "./../services/api/api.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      mobile: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.signinForm.reset();
  }
  onSubmit() {
    const mobile = this.signinForm.controls["mobile"].value;
    const pass = this.signinForm.controls["password"].value;
    if (this.signinForm.valid) {
      this.apiService.signIn(mobile, pass).subscribe((data: any) => {
        this.storage.set("mobile", mobile);
        this.onSignupSuccess(data);
      });
    }
  }

  private onSignupSuccess(data: any) {
    Promise.all([
      this.storage.set("refresh", data.refresh),
      this.storage.set("authorization", data.access),
    ]).then(([ok1, ok2]) => {
      console.log("SET : ");
    });
    this.apiService.me().subscribe((data) => {
      this.storage.set("user_type", data["user"].profile);
      this.storage.set("user_name", data["user"].name);
      const profile = data["user"].profile;
      if (data["user"].verification_state == "UNVERIFIED") {
        this.router.navigate(["/signup/verify"], {
          state: { businesses: data },
        });
        return;
      } else if (profile == "ServiceProvider") {
        if (data["user"].businesses.length > 0) {
          this.storage.set("isCompletedProfile", true);
          this.router.navigate(["/menu/view-businesses"], {
            state: { businesses: data },
          });
        } else {
          this.storage.set("isCompletedProfile", false);
          this.router.navigate(["/menu/complete-profile"]);
        }
        return;
      }
      this.router.navigate(["/menu/user-services"]);
    });
  }

  async handleButtonClick() {
    const alert = await this.alertController.create({
      header: "Request after 5mins",
      buttons: ["Ok"],
    });

    await alert.present();
  }
}
