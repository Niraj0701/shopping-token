import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
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
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      mobile: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    const mobile = this.signinForm.controls["mobile"].value;
    const pass = this.signinForm.controls["password"].value;
    localStorage.setItem("mobile", mobile);
    this.storage.set("mobile", mobile);
    this.apiService.signIn(mobile, pass).subscribe((data: any) => {
      this.onSignupSuccess(data);
    });
  }

  private onSignupSuccess(data: any) {
    localStorage.setItem("refresh", data.refresh);
    this.storage.set("refresh", data.refresh);
    localStorage.setItem("authorization", data.access);
    this.storage.set("authorization", data.access);
    this.apiService.me().subscribe((data) => {
      localStorage.setItem("user_type", data["user"].profile);
      this.storage.set("user_type", data["user"].profile);
      localStorage.setItem("user_name", data["user"].name);
      this.storage.set("user_name", data["user"].name);
      this.apiService.userProfile.next(data["user"]);
      if (data["user"].verification_state == "UNVERIFIED") {
        this.router.navigate(["/signup/verify"], {
          state: { businesses: data },
        });
        return;
      } else if (localStorage.getItem("user_type") == "ServiceProvider") {
        if (data["user"].businesses.length > 0) {
          this.router.navigate(["/menu/view-businesses"], {
            state: { businesses: data },
          });
        } else {
          this.router.navigate(["/menu/complete-profile"]);
        }
        return;
      }
      this.router.navigate(["/menu/user-services"]);
    });
  }
}
