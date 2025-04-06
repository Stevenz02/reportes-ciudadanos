import { Routes } from '@angular/router';

export const REPORTES_ROUTES: Routes = [
  {
    path: 'crear',
    loadComponent: () => import('./crear/crear.component').then(m => m.CrearComponent)
  },
  {
    path: 'lista',
    loadComponent: () => import('./lista/lista.component').then(m => m.ListaComponent)
  },
  { path: '**', redirectTo: 'lista' }
];