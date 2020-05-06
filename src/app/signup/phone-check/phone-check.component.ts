import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ModalPage } from "./modal.page";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";

@Component({
  selector: "app-phone-check",
  templateUrl: "./phone-check.component.html",
  styleUrls: ["./phone-check.component.scss"],
})
export class PhoneCheckComponent implements OnInit {
  public data: any;
  private otp: any;
  verifyOtpForm: FormGroup;
  userMobile: any;
  modal: any;
  constructor(
    private storage: Storage,
    public modalController: ModalController,
    private loading: LoaderService,
    private router: Router,
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.verifyOtpForm = new FormGroup({
      otp: new FormControl("", [Validators.required]),
    });
    this.data = this.router.getCurrentNavigation().extras.state.businesses;
    this.storage.get("mobile").then((mobile) => {
      this.userMobile = mobile;
      this.apiService.getOtp().subscribe(
        (data) => {
          // this.verifyOtpForm.controls.otp.setValue(data["otp"]);
          // this.otp = data["otp"];
        },
        (err) => {
          if (err.status === 400) {
            Promise.all([
              this.storage.remove("mobile"),
              this.storage.remove("authorization"),
              this.storage.remove("user_type"),
              this.storage.remove("user_name"),
              this.storage.remove("refresh"),
            ]).then(() => {
              this.router.navigate(["/login"]);
              this.handleButtonClick(err.error);
            });
          }
        }
      );
    });
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        userdata: this.data,
      },
      cssClass: "confirmation-popup",
    });
    return await this.modal.present();
  }

  async onVerifyClick() {
    if (this.verifyOtpForm.valid) {
      const otp = this.verifyOtpForm.get("otp").value;
      this.apiService.verifyOtp(otp, this.data.user.id).subscribe(
        (data) => {
          if (data === "INVALID_OTP") {
            this.handleButtonClick(data);
          } else {
            this.presentModal();
            this.modal ? this.modal.dismiss() : "";
          }
        },
        (error) => {
          console.log("Error : ", error);
        }
      );
    }
  }
  goBack() {
    this.router.navigate(["/login"]);
  }
  async handleButtonClick(error: any) {
    const alert = await this.alertController.create({
      header: error,
      buttons: ["Ok"],
    });

    await alert.present();
  }
}
