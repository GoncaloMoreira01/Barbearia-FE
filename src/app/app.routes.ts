import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Pricing } from './pricing/pricing';
import { Panel } from './panel/panel';

export const routes: Routes = [
    {
        path: "home",
        component: Home,
    },
     {
        path: "pricing",
        component: Pricing,
    },
     {
        path: "panel",
        component: Panel,
    },

    { path: '**', redirectTo: '/home' }
];
