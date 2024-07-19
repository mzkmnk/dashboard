import { Routes } from '@angular/router';
import { SidebarComponent } from './internal/shared/components/layout/sidebar/sidebar.component';

export const routes: Routes = [
    {
        path:'internal',
        loadChildren: () => import('./internal/internal.routes').then((M) => M.INTERNAL_ROUTES),
        component:SidebarComponent
    },
    {
        path:'**',
        redirectTo:'internal',
    }
];