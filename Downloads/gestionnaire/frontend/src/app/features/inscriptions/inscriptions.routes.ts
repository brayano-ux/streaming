// inscriptions.routes.ts
import { Routes } from '@angular/router';

export const INSCRIPTIONS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-inscriptions/liste-inscriptions').then(m => m.ListeInscriptions) },
  { path: 'nouvelle', loadComponent: () => import('./pages/nouvelle-inscription/nouvelle-inscription').then(m => m.NouvelleInscription) },
  {path:'liste-inscription',loadComponent:()=>import('./pages/liste-inscriptions/liste-inscriptions').then(m=>m.ListeInscriptions)}

];
