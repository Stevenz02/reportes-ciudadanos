import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./recuperar/recuperar/recuperar.component').then(m => m.RecuperarComponent)
  },
  {
    path: 'restablecer',
    loadComponent: () => import('./recuperar/restablecer/restablecer.component').then(m => m.RestablecerComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
  },
  { path: '**', redirectTo: 'login' }
];

