import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CompleteProfilePageRoutingModule } from "./complete-profile-routing.module";

import { CompleteProfilePage } from "./complete-profile.page";
import { ApiServiceModule } from "../services/api/apiService.module";
import { GeolocationModule } from "../services/geolocation/geolocation.module";
import { AddressAutocompleteComponent } from './address-autocomplete/address-autocomplete.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  imports: [
    GooglePlaceModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiServiceModule,
    GeolocationModule,
    IonicModule,
    CompleteProfilePageRoutingModule,
  ],
  declarations: [AddressAutocompleteComponent,CompleteProfilePage],
})
export class CompleteProfilePageModule {}
