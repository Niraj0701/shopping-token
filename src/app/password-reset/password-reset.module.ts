import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PasswordResetPageRoutingModule } from "./password-reset-routing.module";
import { ApiServiceModule } from "../services/api/apiService.module";
import { PasswordResetPage } from "./password-reset.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApiServiceModule,
    PasswordResetPageRoutingModule,
  ],
  declarations: [PasswordResetPage],
})
export class PasswordResetPageModule {}
