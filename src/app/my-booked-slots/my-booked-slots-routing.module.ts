import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBookedSlotsPage } from './my-booked-slots.page';

const routes: Routes = [
  {
    path: '',
    component: MyBookedSlotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBookedSlotsPageRoutingModule {}
