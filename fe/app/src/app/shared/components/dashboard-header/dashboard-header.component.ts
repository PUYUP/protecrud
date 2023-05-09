import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/features/user/services';
import { LogOut, UserState } from 'src/app/features/user/state';

@Component({
  selector: 'shared-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {

  constructor(
    private authService: AuthService,
    private store: Store<UserState>,
  ) {}

  logOutHandler(): void {
    this.store.dispatch(LogOut());
  }

}
