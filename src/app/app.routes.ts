import { RouterModule, Routes } from '@angular/router';
import { UserList } from './modules/users/user-list/user-list';
import { UserAdd } from './modules/users/user-add/user-add';
import { NgModule } from '@angular/core';
import { Logincomponent } from './login/loginn/logincomponent/logincomponent';
import { Homecomponent } from './home/home/homecomponent/homecomponent';
import { authGuard } from './core/services/auth-guard';
import { Dashboardcomponent } from './modules/dashboard/dashboardcomponent/dashboardcomponent';
import { DashboardModule } from './modules/dashboard/dashboard-module';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login',component:Logincomponent},
  {
    path:'home',
    component:Homecomponent,
    // canActivate:[authGuard],
    children:[
      { path: 'dashboard', loadComponent: () => import('./modules/dashboard/dashboardcomponent/dashboardcomponent').then(m => m.Dashboardcomponent) }, 
      { path: 'app-user-list', component: UserList },
      { path: 'app-user-add', component: UserAdd },
      { 
       path: 'app-user-edit/:id', 
       loadComponent: () => import('./modules/users/user-edit/user-edit').then(m => m.UserEdit)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
       
 
       
  
    ]
  },{ path: '**', redirectTo: 'login' }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}