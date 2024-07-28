import { Routes } from '@angular/router';
import { LayoutComponent } from './internal/shared/components/layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((M) => M.AUTH_ROUTES),
  },
  {
    path: 'internal',
    loadChildren: () =>
      import('./internal/internal.routes').then((M) => M.INTERNAL_ROUTES),
    component: LayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
