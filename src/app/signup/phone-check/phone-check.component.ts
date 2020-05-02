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
  private data: any;
  private otp: any;
  verifyOtpForm: FormGroup;
  userMobile: any;
  constructor(
    private storage: Storage,
    public modalController: ModalController,
    private loading: LoaderService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.storage.get("mobile").then(mobile => {
      this.userMobile = mobile;
      this.data = this.router.getCurrentNavigation().extras.state.businesses;
      this.apiService.getOtp().subscribe(
        (data) => {
          this.verifyOtpForm.controls.otp.setValue(data["otp"]);
          this.otp = data["otp"];
        },
        (err) => {
          if (err.status === 400) {
            this.storage.clear();
            this.router.navigate(["/login"]);
            alert("Request after 5mins");
          }
        }
      );
      this.verifyOtpForm = new FormGroup({
        otp: new FormControl("", [Validators.required]),
      });
    });
  }

  async onVerifyClick() {
    if (this.verifyOtpForm.valid) {
      this.apiService.verifyOtp(this.otp, this.data.id).subscribe();
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          userdata: this.data,
        },
        cssClass: "confirmation-popup",
      });
      return await modal.present();
    }
  }
  goBack() {
    this.router.navigate(["/login"]);
  }
}
