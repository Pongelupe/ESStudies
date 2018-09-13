import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
