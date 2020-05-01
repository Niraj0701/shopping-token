import { Storage } from '@ionic/storage';
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
  userdata;
  constructor(public viewCtrl: ModalController, private router: Router, private storage: Storage) { }

  dismiss() {
    this.viewCtrl.dismiss().then((data) => {
      this.storage.get("user_type").then(profile => {
        if (profile === "ServiceProvider") {
          if (this.userdata["user"].businesses.length > 0) {
            this.router.navigate(["/menu/view-businesses"], {
              state: { businesses: this.userdata },
            });
          } else {
            this.router.navigate(["/menu/complete-profile"]);
          }
        } else {
          this.router.navigate(["/"]);
        }
      });
    });
  }
}
