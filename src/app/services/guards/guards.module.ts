import { NgModule } from '@angular/core';
import { LoggedInGuard } from './loggedIn.guard';


@NgModule({
   imports: [],
   exports: [],
   providers: [ LoggedInGuard ],
})
export class GuardsModule { }
