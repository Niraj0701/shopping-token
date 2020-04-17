import { NgModule } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
   imports: [
   ],
   exports: [ ],
   providers: [ Geolocation, GeolocationService ],
})
export class GeolocationModule { 

}
