import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { IsGuestGuard } from './guards';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationPageComponent,
    canActivate: [IsGuestGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
