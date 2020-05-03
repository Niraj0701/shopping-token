import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  ForgotPass: FormGroup;
  showOtpInput: boolean = false;
  submitted: boolean = false;
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.ForgotPass = new FormGroup({
      mobile: new FormControl("", [Validators.required]),
      otp: new FormControl("", [Validators.required]),
    });
  }
  sendOTP() {
    this.submitted = true;
    const body = this.ForgotPass.value;
    if (body.mobile != "") {
      this.apiService.forgotPassword(body.mobile).subscribe(
        (data) => {
          this.showOtpInput = true;
        },
        (err) => {
          this.showOtpInput = false;
          if (err.status === 400) {
            this.handleButtonClick(err.error);
          }
        }
      );
    }
  }

  onSubmit() {
    this.loading.show();
    if (this.ForgotPass.valid) {
      this.loading.hide();
      this.route.navigate(["/password-reset"], {
        state: { info: { ...this.ForgotPass.value } },
      });
    } else {
      this.loading.hide();
    }
  }
  goBack() {
    this.route.navigate(["/login"]);
  }
  async handleButtonClick(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ["Ok"],
    });

    await alert.present();
  }
}
