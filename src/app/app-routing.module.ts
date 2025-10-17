import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {LayoutsComponent} from './components/layouts/layouts.component';
import {AboutComponent} from './components/about/about.component';
import {ShopComponent} from './components/shop/shop.component';
import {AuthGuard} from './guards/auth.guard';
import {OptionComponent} from './components/option/option.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {
    path: '',
    component:LayoutsComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: 'Home', component: HomeComponent},
      {path: 'About',component: AboutComponent},
      {path: 'Shop', component: ShopComponent},
      {path: 'Option', component: OptionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
