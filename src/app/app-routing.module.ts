import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoggedInGuard } from './services/guards/loggedIn.guard';
import { BusinessGuard } from './services/guards/business.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/user-services',
    pathMatch: 'full'
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  /* {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
  },
  {
    path: 'business-profile',
    canLoad: [ BusinessGuard ],
    loadChildren: () => import('./business-profile/business-profile.module').then( m => m.BusinessProfilePageModule)
  }, */
  {
    path: 'login',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  /* {
    path: 'user-services',
    canActivate: [ LoggedInGuard ], 
    children: [
      {
        path: '',
        loadChildren: () => import('./user-services/user-services.module').then( m => m.UserServicesPageModule)
      }
    ]
    
  },
  {
    path: 'shops-list',
    loadChildren: () => import('./shops-list/shops-list.module').then( m => m.ShopsListPageModule)
  },
  {
    path: 'time-slots',
    loadChildren: () => import('./time-slots/time-slots.module').then( m => m.TimeSlotsPageModule)
  },
  {
    path: 'book-success',
    loadChildren: () => import('./book-success/book-success.module').then( m => m.BookSuccessPageModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule)
  },
  {
    path: 'view-businesses',
    loadChildren: () => import('./view-businesses/view-businesses.module').then( m => m.ViewBusinessesPageModule)
  }, */
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
