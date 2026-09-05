// features/classes/classes.routes.ts
import { Routes } from '@angular/router';

export const CLASSES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-classes/liste-classes').then(m => m.ListeClasses) },
  { path: 'nouvelle', loadComponent: () => import('./pages/nouvelle-classe/nouvelle-classe').then(m => m.NouvelleClasse) },
  { path: ':id/modifier', loadComponent: () => import('./pages/modifier-classe/modifier-classe').then(m => m.ModifierClasse) }
];
