import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BusinessProfilePageRoutingModule } from "./business-profile-routing.module";

import { BusinessProfilePage } from "./business-profile.page";
import { ApiServiceModule } from "../services/api/apiService.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiServiceModule,
    BusinessProfilePageRoutingModule,
  ],
  declarations: [BusinessProfilePage],
})
export class BusinessProfilePageModule {}
