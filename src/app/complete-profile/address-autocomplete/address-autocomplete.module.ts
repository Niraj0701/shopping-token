import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ApiServiceModule } from 'src/app/services/api/apiService.module';
import { GeolocationModule } from 'src/app/services/geolocation/geolocation.module';
import { AddressAutocompleteComponent } from './address-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiServiceModule,
    GeolocationModule,
    IonicModule,
  ],
  declarations: [AddressAutocompleteComponent],
  exports: [AddressAutocompleteComponent],

})
export class  AddressAutocompleteModule {}
