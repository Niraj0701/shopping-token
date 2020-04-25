import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";

@Component({
  selector: "modal-page",
  template: ` <div style="display: flex; margin:auto;">
    <div style="margin:auto; text-align: center;">
      <img
        src="../../../assets/icons/tick.svg"
        style="width: 40px; height:40px;"
      />
      <h3 style="font-family: sans-serif; padding: 10px;">
        You phone number has been verified
      </h3>
      <ion-button
        class="shopping-button"
        style="--border-radius: 30px; width:30vw; margin: 3vh 0"
        (click)="dismiss()"
      >
        OK
      </ion-button>
    </div>
  </div>`,
})
export class ModalPage {
  constructor(public viewCtrl: ModalController, private router: Router) {}

  dismiss() {
    this.viewCtrl.dismiss().then((data) => {
      console.log("** : ", data);
      let profile = localStorage.getItem("profile");
      if (profile === "ServiceProvider") {
        this.router.navigate(["/complete-profile"]);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
}
