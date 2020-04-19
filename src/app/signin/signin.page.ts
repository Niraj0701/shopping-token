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
    console.log("data : ", data);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("authorization", data.access);
    this.apiService.me().subscribe((data) => {
      localStorage.setItem("user_type", data["user"].profile);
      this.apiService.userProfile.next(data["user"]);
      if (
        localStorage.getItem("user_type") === "ServiceProvider" &&
        localStorage.getItem("isCompleteProfile") === "true"
      ) {
        this.router.navigate(["/business-profile"]);
        return;
      } else if (localStorage.getItem("user_type") === "ServiceProvider") {
        this.router.navigate(["/complete-profile"]);
        return;
      }
      this.router.navigate(["/user-services"]);
    });
  }
}
