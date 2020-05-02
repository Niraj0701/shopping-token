import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  ForgotPass: FormGroup;
  showOtpInput: boolean = false;
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.ForgotPass = new FormGroup({
      mobile: new FormControl("", [Validators.required]),
      otp: new FormControl("", [Validators.required]),
    });
  }
  sendOTP() {
    this.showOtpInput = true;
    const body = this.ForgotPass.value;
    // this.verifyOtpForm.controls.otp.setValue(data["otp"]);
    this.apiService.forgotPassword(body.mobile).subscribe(
      (data) => {
        this.ForgotPass.controls.otp.setValue(data["otp"]);
      },
      (err) => {
        this.loading.hide();
        if (err.status === 400) {
          alert("User doesn't exist");
        }
      }
    );
  }

  onSubmit() {
    if (this.ForgotPass.valid) {
      this.loading.show();
      this.route.navigate(["/password-reset"], {
        state: { info: { ...this.ForgotPass.value } },
      });
    }
  }
}
