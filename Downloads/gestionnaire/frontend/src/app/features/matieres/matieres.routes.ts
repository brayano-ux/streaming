import { Routes } from '@angular/router';

// features/matieres/matieres.routes.ts
// features/matieres/matieres.routes.ts
export const MATIERES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-matieres/liste-matieres').then(m => m.ListeMatieres) },
  { path: 'nouvelle-matiere', loadComponent: () => import('./pages/nouvelle-matiere/nouvelle-matiere').then(m => m.NouvelleMatiere) },
  { path: 'affecter', loadComponent: () => import('./pages/affecter-matiere/affecter-matiere').then(m => m.AffecterMatiere) }
];
