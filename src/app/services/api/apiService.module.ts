import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from './loading.service';

@NgModule({
   imports: [
      HttpClientModule
   ],
   providers: [ ApiService, LoaderService ],
})
export class ApiServiceModule { 

}
