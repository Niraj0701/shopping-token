import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSuccessPage } from './book-success.page';

const routes: Routes = [
  {
    path: '',
    component: BookSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookSuccessPageRoutingModule {}
