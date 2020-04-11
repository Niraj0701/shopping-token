import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
   selector: 'modal-page',
   template: `
   <div style="display: flex; margin:auto;">
     <div style="margin:auto; text-align: center;">
       <img src="../../../assets/icons/tick.svg" style="width: 40px; height:40px;" />
       <h3>
           You phone number has been verified
       </h3>
       <ion-button style="--border-radius: 30px; width:30vw; margin: 3vh 0" (click)="dismiss()">
         OK
       </ion-button>
     </div>
   </div>`
 })
 export class ModalPage {
 
   constructor(public viewCtrl: ModalController) {
 
   }

   dismiss() {
      this.viewCtrl.dismiss().then(data => {
         console.log('** : ', data)
      })
   }
 
 }