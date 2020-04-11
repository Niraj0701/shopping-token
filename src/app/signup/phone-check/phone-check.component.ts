import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from './modal.page';

@Component({
  selector: 'app-phone-check',
  templateUrl: './phone-check.component.html',
  styleUrls: ['./phone-check.component.scss'],
})
export class PhoneCheckComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async onVerifyClick() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'confirmation-popup'
    });
    return await modal.present();
  }

}
