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
  {
    path: 'detalle',
    loadComponent: () => import('./detalle/detalle.component').then(m => m.DetalleComponent)
  },
  { path: '**', redirectTo: 'lista' }
];
