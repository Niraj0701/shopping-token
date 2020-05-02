import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ForgotPasswordPageRoutingModule } from "./forgot-password-routing.module";
import { ApiServiceModule } from "../services/api/apiService.module";
import { ForgotPasswordPage } from "./forgot-password.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiServiceModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
  ],
  declarations: [ForgotPasswordPage],
})
export class ForgotPasswordPageModule {}
