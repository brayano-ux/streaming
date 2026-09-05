// features/paiements/paiements.routes.ts
import { Routes } from '@angular/router';

export const PAIEMENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-paiements/liste-paiements').then(m => m.ListePaiements) },
  { path: 'nouveau', loadComponent: () => import('./pages/nouveau-paiement/nouveau-paiement').then(m => m.NouveauPaiement) }
];
