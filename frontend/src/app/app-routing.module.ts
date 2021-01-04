import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login.component';
import {IndexComponent} from './components/index.component';
import {AuthGuard} from './guards/auth.guard';
import {UserComponent} from './components/user.component';
import { RegisterComponent } from './components/register.component';
import { GiftComponent } from './components/gift.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'gift',
    component: GiftComponent
  },
  {
    path: '**',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
