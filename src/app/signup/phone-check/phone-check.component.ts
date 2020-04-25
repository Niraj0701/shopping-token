import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ModalPage } from "./modal.page";
import { LoaderService } from "src/app/services/api/loading.service";

@Component({
  selector: "app-phone-check",
  templateUrl: "./phone-check.component.html",
  styleUrls: ["./phone-check.component.scss"],
})
export class PhoneCheckComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    private loading: LoaderService
  ) {}

  ngOnInit() {
    this.loading.hide();
  }

  async onVerifyClick() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: "confirmation-popup",
    });
    return await modal.present();
  }
}
