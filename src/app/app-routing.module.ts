import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CallbackComponent} from "./callback/callback.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {BusinessFormComponent} from "./business-form/business-form.component";
import {BusinessTableComponent} from "./business-table/business-table.component";

import {LayoutComponent} from "./layout/layout.component";
const routes: Routes = [
    {path: '',                 pathMatch : 'full', redirectTo: 'home'},

    {path : '',                component: LayoutComponent,
        children:[
            {path : 'registry',    loadChildren: () => import('./registry/registry.module').then(m => m.RegistryModule) },
            {path : 'chat',        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
            {path : 'home',        component: HomeComponent},
            {path : 'callback',    component: CallbackComponent},
            {path : 'dashboard',   component: DashboardComponent},
            {path : 'docs',        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) }
    ]},
    {path : '',                component: LayoutComponent,
        children:[
          {path : 'business',     			component:BusinessFormComponent},
          {path : 'business/:id',     			component:BusinessFormComponent},
          {path : 'businesss',     			component:BusinessTableComponent},
    ]},
    {path : '',                component: LayoutComponent,
        children:[
            {path : 'settings',        loadChildren: () => import('./sassy/settings/settings.module').then(m => m.SettingsModule),canActivate: [AuthGuard]},
            {path : 'subscribe/:id',   loadChildren: () => import('./sassy/subscribe/subscribe.module').then(m => m.SubscribeModule),canActivate: [AuthGuard]},
            {path : 'pricing',         loadChildren: () => import('./sassy/pricing/pricing.module').then(m => m.PricingModule) },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
