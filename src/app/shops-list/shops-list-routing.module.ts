import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopsListPage } from './shops-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShopsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsListPageRoutingModule {}
