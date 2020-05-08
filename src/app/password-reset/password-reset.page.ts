import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";
import { AlertController } from "@ionic/angular";
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
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
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
          this.handleButtonClick();
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
    this.route.navigate(["/forgot-password"]);
  }

  async handleButtonClick() {
    const alert = await this.alertController.create({
      header: "Password has been reset successfully",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.route.navigate(["/login"]);
          },
        },
      ],
    });

    await alert.present();
  }
}
