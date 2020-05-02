import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";
@Component({
  selector: "app-password-reset",
  templateUrl: "./password-reset.page.html",
  styleUrls: ["./password-reset.page.scss"],
})
export class PasswordResetPage implements OnInit {
  resetPass: FormGroup;
  userInfo: any;
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    console.log("zdfad", this.route.getCurrentNavigation().extras.state.info);
    this.userInfo = this.route.getCurrentNavigation().extras.state.info;
    this.resetPass = new FormGroup({
      password: new FormControl("", [Validators.required]),
      confirmedPassword: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    const body = this.resetPass.value;
    if (this.resetPass.valid) {
      this.loading.show();
      this.apiService.resetPassword({ ...body, ...this.userInfo }).subscribe(
        (data) => {
          this.loading.hide();
          this.route.navigate(["/login"]);
        },
        (err) => {
          this.loading.hide();
          if (err.status === 400) {
            alert("User doesn't exist");
          }
        }
      );
    }
  }

  goBack() {
    this.route.navigate(["/login"]);
  }
}
