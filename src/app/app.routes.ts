import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () => import('./features/components/signup/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/components/login/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'listing',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/add-listing/add-listing/add-listing.component').then(m => m.AddListingComponent)
    }
];
