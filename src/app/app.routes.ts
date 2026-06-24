import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Pricing } from './components/pricing/pricing';
import { Panel } from './components/panel/panel'; 
import { Login } from './components/login/login';
import { CreateUser } from './components/create-user/create-user';

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
     {
        path: "create-user",
        component: CreateUser,
    },

    { path: '**', redirectTo: '/home' }
];
