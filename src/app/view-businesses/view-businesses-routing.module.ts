import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBusinessesPage } from './view-businesses.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBusinessesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBusinessesPageRoutingModule {}
