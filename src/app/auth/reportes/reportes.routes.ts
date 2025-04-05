import { Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { ListaComponent } from './lista/lista.component';

export const REPORTES_ROUTES: Routes = [
  { path: 'crear', component: CrearComponent },
  { path: 'lista', component: ListaComponent },
  { path: '**', redirectTo: 'lista' } // Redirecciona a lista si la ruta no existe
];
