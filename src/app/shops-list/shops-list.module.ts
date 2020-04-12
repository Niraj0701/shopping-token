import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopsListPageRoutingModule } from './shops-list-routing.module';

import { ShopsListPage } from './shops-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopsListPageRoutingModule
  ],
  declarations: [ShopsListPage]
})
export class ShopsListPageModule {}
