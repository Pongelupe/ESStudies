import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule { }
