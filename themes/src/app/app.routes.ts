import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path : 'current-theme', component: CurrentThemeComponent},
  {path : 'themes', component: MainComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component: RegisterComponent}
];
