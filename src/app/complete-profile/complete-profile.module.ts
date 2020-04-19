import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CompleteProfilePageRoutingModule } from "./complete-profile-routing.module";

import { CompleteProfilePage } from "./complete-profile.page";
import { ApiServiceModule } from "../services/api/apiService.module";
import { GeolocationModule } from "../services/geolocation/geolocation.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiServiceModule,
    GeolocationModule,
    IonicModule,
    CompleteProfilePageRoutingModule,
  ],
  declarations: [CompleteProfilePage],
})
export class CompleteProfilePageModule {}