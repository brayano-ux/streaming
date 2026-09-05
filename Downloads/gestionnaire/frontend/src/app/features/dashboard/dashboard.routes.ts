import { Routes } from '@angular/router';
import {  DashboardComponent } from './pages/dashboard/dashboard';
export const DASHBOARD_ROUTES: Routes = [
  { path: '', component:  DashboardComponent },
  { path: 'eleves', loadChildren: () => import('../eleves/eleves.routes').then(m => m.ELEVES_ROUTES) },
  { path: 'inscriptions', loadChildren: () => import('../inscriptions/inscriptions.routes').then(m => m.INSCRIPTIONS_ROUTES) },
  { path: 'classes', loadChildren: () => import('../classes/classes.routes').then(m => m.CLASSES_ROUTES) },
  { path: 'enseignants', loadChildren: () => import('../enseignants/enseignants.routes').then(m => m.ENSEIGNANTS_ROUTES) },
  { path: 'notes', loadChildren: () => import('../notes/notes.routes').then(m => m.NOTES_ROUTES) },
  { path: 'paiements', loadChildren: () => import('../paiements/paiements.routes').then(m => m.PAIEMENTS_ROUTES) },
  { path: 'depenses', loadChildren: () => import('../depenses/depenses.routes').then(m => m.DEPENSES_ROUTES) },
  { path: 'recettes', loadChildren: () => import('../recettes/recettes.routes').then(m => m.RECETTES_ROUTES) },
  { path: 'bulletins', loadChildren: () => import('../bulletins/bulletins.routes').then(m => m.BULLETINS_ROUTES) },
  { path: 'matieres', loadChildren: () => import('../matieres/matieres.routes').then(m => m.MATIERES_ROUTES) },
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) },
  // {path:'formulaire',loadChildren:()=>import()}


];
