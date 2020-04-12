import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShopsListPageRoutingModule } from './shops-list-routing.module';
import { ShopsListPage } from './shops-list.page';
import { ApiServiceModule } from '../services/api/apiService.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopsListPageRoutingModule,
    ApiServiceModule
  ],
  declarations: [ShopsListPage]
})
export class ShopsListPageModule {}
