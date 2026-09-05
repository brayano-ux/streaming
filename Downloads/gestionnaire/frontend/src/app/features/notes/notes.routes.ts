// features/notes/notes.routes.ts
import { Routes } from '@angular/router';

export const NOTES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-notes/liste-notes').then(m => m.ListeNotes) },
  { path: 'saisie', loadComponent: () => import('./pages/saisie-notes/saisie-notes').then(m => m.SaisieNotes) },
  { path: 'eleve/:eleveId', loadComponent: () => import('./pages/details-notes-eleve/details-notes-eleve').then(m => m.DetailsNotesEleve) }

];
