import { NgModule } from '@angular/core';
import { AuthInterceptor } from './interceptor';


@NgModule({
   imports: [],
   exports: [],
   providers: [ AuthInterceptor ],
})
export class SecurityModule { }
