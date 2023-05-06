import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardFooterComponent,
    DashboardHeaderComponent
  ],
  entryComponents: [
    DashboardFooterComponent,
    DashboardHeaderComponent
  ],
  exports: [
    DashboardFooterComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
