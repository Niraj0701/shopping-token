import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookSuccessPageRoutingModule } from './book-success-routing.module';

import { BookSuccessPage } from './book-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookSuccessPageRoutingModule
  ],
  declarations: [BookSuccessPage]
})
export class BookSuccessPageModule {}
