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
        path: 'update/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/listing-form/listing-form/listing-form.component').then(m => m.AddListingComponent)
    },
    {
        path: 'add',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/listing-form/listing-form/listing-form.component').then(m => m.AddListingComponent)
    },
    {
        path: 'event/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/event-detail/event-detail/event-detail.component').then(m => m.EventDetailComponent)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/profile/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: '',
        loadComponent: () => import('./features/components/home/home/home.component').then(m => m.HomeComponent)
    }
];
