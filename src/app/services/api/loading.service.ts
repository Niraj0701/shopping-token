import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  loading: any;
  private isLoading: boolean;
  constructor(public loadingController: LoadingController) {
  }

  /* async show() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...'
    });
    return await this.loading.present();

  }

  async hide() {
    await this.loading.dismiss();
  } */

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


}