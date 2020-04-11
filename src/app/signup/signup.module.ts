import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PhoneCheckComponent } from './phone-check/phone-check.component';
import { ModalPage } from './phone-check/modal.page';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  declarations: [
    ModalPage,
    SignupPage, 
    SignupFormComponent,
    PhoneCheckComponent,
  ],
  entryComponents: [ModalPage ]
})
export class SignupPageModule { }
