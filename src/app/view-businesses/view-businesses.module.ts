import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ViewBusinessesPageRoutingModule } from "./view-businesses-routing.module";
import { ApiServiceModule } from "../services/api/apiService.module";
import { ViewBusinessesPage } from "./view-businesses.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiServiceModule,
    ViewBusinessesPageRoutingModule,
  ],
  declarations: [ViewBusinessesPage],
})
export class ViewBusinessesPageModule {}
