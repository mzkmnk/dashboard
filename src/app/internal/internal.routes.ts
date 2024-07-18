import { Routes } from "@angular/router";

export const INTERNAL_ROUTES : Routes = [
    {
        path:'home',
        loadComponent : () => import('./main/pages/home/home.component').then((M) => M.HomeComponent),
    },
    {
        path:'**',
        redirectTo:'home',
    }
]