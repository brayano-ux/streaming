import { Routes } from '@angular/router';

export const ELEVES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/liste-eleves/liste-eleves')
        .then(m => m.ListeEleves)
  },
  {
    path: 'nouveau',
    loadComponent: () =>
      import('./pages/nouvel-eleve/nouvel-eleve')
        .then(m => m.NouvelEleve)
  },
  {
    path: ':id/modifier',
    loadComponent: () =>
      import('./pages/modifier-eleve/modifier-eleve')
        .then(m => m.ModifierEleve)
  },
  { path: ':id', loadComponent: () => import('./pages/details-eleve/details-eleve').then(m => m.DetailsEleve) }

];
