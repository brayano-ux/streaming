// features/bulletins/bulletins.routes.ts
import { Routes } from '@angular/router';

export const BULLETINS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/liste-bulletins/liste-bulletins').then(m => m.ListeBulletins) }
];
