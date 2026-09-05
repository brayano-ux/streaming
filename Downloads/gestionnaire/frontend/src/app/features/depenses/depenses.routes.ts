// features/depenses/depenses.routes.ts
import { Routes } from '@angular/router';

export const DEPENSES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-depenses/liste-depenses').then(m => m.ListeDepenses) },
  { path: 'nouvelle', loadComponent: () => import('./pages/nouvelle-depense/nouvelle-depense').then(m => m.NouvelleDepense) }
];
