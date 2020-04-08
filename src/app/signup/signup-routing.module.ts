import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPage } from './signup.page';
import { SignupFormComponent } from './signup-form/signup-form.component';


const routes: Routes = [
  {
    path: '',
    component: SignupPage
  },
  {
    path: 'form',
    component: SignupFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {}
