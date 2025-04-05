import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecuperarComponent } from './recuperar/recuperar/recuperar.component';
import { RestablecerComponent } from './recuperar/restablecer/restablecer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { REPORTES_ROUTES } from './reportes/reportes.routes';

export const AUTH_ROUTES: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'restablecer', component: RestablecerComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'reportes',
    children: REPORTES_ROUTES
  },
  { path: '**', redirectTo: 'login' }
];
