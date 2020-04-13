import { NgModule } from '@angular/core';
import { LoggedInGuard } from './loggedIn.guard';
import { BusinessGuard } from './business.guard';


@NgModule({
   imports: [],
   exports: [],
   providers: [ LoggedInGuard, BusinessGuard ],
})
export class GuardsModule { }
