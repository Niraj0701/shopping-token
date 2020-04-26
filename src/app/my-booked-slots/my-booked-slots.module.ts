import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MyBookedSlotsPageRoutingModule } from "./my-booked-slots-routing.module";

import { MyBookedSlotsPage } from "./my-booked-slots.page";
import { ApiServiceModule } from "../services/api/apiService.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiServiceModule,
    MyBookedSlotsPageRoutingModule,
  ],
  declarations: [MyBookedSlotsPage],
})
export class MyBookedSlotsPageModule {}
