import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './features/user/guards';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'tracker',
    loadChildren: () => import('./features/tracker/tracker.module').then(m => m.TrackerModule),
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: 'tracker',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
