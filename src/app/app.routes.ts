import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Pricing } from './pricing/pricing';
import { Panel } from './panel/panel';
import { Login } from './login/login';

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
    {
        path: "login",
        component: Login,
    },

    { path: '**', redirectTo: '/home' }
];
