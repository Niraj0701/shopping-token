import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoggedInGuard } from "./services/guards/loggedIn.guard";
import { BusinessGuard } from "./services/guards/business.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "menu/user-services",
    pathMatch: "full",
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./signin/signin.module").then((m) => m.SigninPageModule),
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./menu/menu.module").then((m) => m.MenuPageModule),
  },
  {
    path: "password-reset",
    loadChildren: () =>
      import("./password-reset/password-reset.module").then(
        (m) => m.PasswordResetPageModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  // {
  //   path: 'my-booked-slots',
  //   loadChildren: () => import('./my-booked-slots/my-booked-slots.module').then( m => m.MyBookedSlotsPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
