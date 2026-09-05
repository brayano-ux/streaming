// features/recettes/recettes.routes.ts
import { Routes } from '@angular/router';

export const RECETTES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-recettes/liste-recettes').then(m => m.ListeRecettes) },
  { path: 'nouvelle', loadComponent: () => import('./pages/nouvelle-recette/nouvelle-recette').then(m => m.NouvelleRecette) }
];
