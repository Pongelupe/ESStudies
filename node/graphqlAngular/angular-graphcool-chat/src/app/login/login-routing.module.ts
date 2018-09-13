import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AutoLoginGuard } from './auto-login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AutoLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AutoLoginGuard]
})
export class LoginRoutingModule { }
