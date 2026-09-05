// features/enseignants/enseignants.routes.ts
import { Routes } from '@angular/router';

export const ENSEIGNANTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-enseignants/liste-enseignants').then(m => m.ListeEnseignants) },
  { path: 'nouveau', loadComponent: () => import('./pages/nouvel-enseignant/nouvel-enseignant').then(m => m.NouvelEnseignant) },
  { path: ':id/modifier', loadComponent: () => import('./pages/modifier-enseignant/modifier-enseignant').then(m => m.ModifierEnseignant) }
];
