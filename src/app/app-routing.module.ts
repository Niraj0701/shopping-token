import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoggedInGuard } from './services/guards/loggedIn.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-services',
    pathMatch: 'full'
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
  },
  {
    path: 'business-profile',
    loadChildren: () => import('./business-profile/business-profile.module').then( m => m.BusinessProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
