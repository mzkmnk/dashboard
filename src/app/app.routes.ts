import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'internal',
        loadChildren: () => import('./internal/internal.routes').then((M) => M.INTERNAL_ROUTES),
    },
    {
        path:'**',
        redirectTo:'internal',
    }
];