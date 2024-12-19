import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyThemesComponent } from './theme/my-themes/my-themes.component';
import { AuthGard } from './guards/auth.guard';
import { ThemesListComponent } from './theme/themes-list/themes-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'themes',
    children: [
      { path: '', component: ThemesListComponent },
      {
        path: ':themeId',
        component: CurrentThemeComponent,
      },
    ],
  },
  { path: '404', component: NotFoundComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'add-theme',
   
    loadComponent: () =>
      import('./theme/add-theme/add-theme.component').then(
        (c) => c.AddThemeComponent
      ),
      canActivate : [AuthGard]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGard] },
  {path: 'my-themes', children: [
    { path: '', component: MyThemesComponent },
    {
      path: ':themeId',
      component: CurrentThemeComponent,
    },
  ],canActivate: [AuthGard]},
  { path: '**', redirectTo: '/404', pathMatch: 'full' },

];
