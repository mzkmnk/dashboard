import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((M) => M.AuthComponent),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
