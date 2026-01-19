import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Pricing } from './pricing/pricing';

export const routes: Routes = [
    {
        path: "home",
        component: Home,
    },
     {
        path: "pricing",
        component: Pricing,
    },

    { path: '**', redirectTo: '/home' }
];
