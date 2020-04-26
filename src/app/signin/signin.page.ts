import { ApiService } from "./../services/api/api.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      name: new FormControl("9766818825", [Validators.required]),
      password: new FormControl("icecream39", [Validators.required]),
    });
  }

  onSubmit() {
    //localStorage.setItem('user', 'niraj');
    //localStorage.setItem('password', 'niraj');

    const name = this.signinForm.controls["name"].value;
    const pass = this.signinForm.controls["password"].value;
    localStorage.setItem("mobile", name);
    this.apiService.signIn(name, pass).subscribe((data: any) => {
      this.onSignupSuccess(data);
    });
  }

  private onSignupSuccess(data: any) {
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("authorization", data.access);
    this.apiService.me().subscribe((data) => {
      localStorage.setItem("user_type", data["user"].profile);
      localStorage.setItem("user_name", data["user"].name);
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
