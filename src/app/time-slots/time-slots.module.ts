import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TimeSlotsPageRoutingModule } from "./time-slots-routing.module";

import { TimeSlotsPage } from "./time-slots.page";
import { ApiServiceModule } from "../services/api/apiService.module";
import { DisablePipe } from "./time.pipe";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeSlotsPageRoutingModule,
    ApiServiceModule,
  ],
  declarations: [TimeSlotsPage, DisablePipe],
})
export class TimeSlotsPageModule {}
