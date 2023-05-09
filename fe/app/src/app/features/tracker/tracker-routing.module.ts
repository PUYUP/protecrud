import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { TrackerComponent } from './tracker.component';
import { CompanyDetailPageComponent } from './pages/company-detail-page/company-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerComponent,
    children: [
      {
        path: '',
        component: IndexPageComponent,
      },
      {
        path: ':pid',
        component: CompanyDetailPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule { }
