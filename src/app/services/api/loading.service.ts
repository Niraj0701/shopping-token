import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  loading: any;
  constructor(public loadingController: LoadingController) {
  }

  async show() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 2000
    });
    return await this.loading.present();

  }

  async hide() {
    await this.loading.dismiss();
  }


}