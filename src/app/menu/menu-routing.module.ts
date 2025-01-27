import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MenuPage } from "./menu.page";
import { BusinessGuard } from "../services/guards/business.guard";
import { LoggedInGuard } from "../services/guards/loggedIn.guard";

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "business-profile",
        canLoad: [BusinessGuard],
        loadChildren: () =>
          import("../business-profile/business-profile.module").then(
            (m) => m.BusinessProfilePageModule
          ),
      },
      {
        path: "user-services",
        canActivate: [LoggedInGuard],
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../user-services/user-services.module").then(
                (m) => m.UserServicesPageModule
              ),
          },
        ],
      },
      {
        path: "shops-list",
        loadChildren: () =>
          import("../shops-list/shops-list.module").then(
            (m) => m.ShopsListPageModule
          ),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('../detail/detail.module').then(
            m => m.DetailPageModule
          ),
      },
      {
        path: "time-slots",
        loadChildren: () =>
          import("../time-slots/time-slots.module").then(
            (m) => m.TimeSlotsPageModule
          ),
      },
      {
        path: "book-success",
        loadChildren: () =>
          import("../book-success/book-success.module").then(
            (m) => m.BookSuccessPageModule
          ),
      },
      {
        path: "complete-profile",
        loadChildren: () =>
          import("../complete-profile/complete-profile.module").then(
            (m) => m.CompleteProfilePageModule
          ),
      },
      {
        path: "view-businesses",
        loadChildren: () =>
          import("../view-businesses/view-businesses.module").then(
            (m) => m.ViewBusinessesPageModule
          ),
      },
      {
        path: "my-booked-slots",
        loadChildren: () =>
          import("../my-booked-slots/my-booked-slots.module").then(
            (m) => m.MyBookedSlotsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
