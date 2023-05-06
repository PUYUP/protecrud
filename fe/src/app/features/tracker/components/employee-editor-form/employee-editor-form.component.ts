import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { SelectEmployees, SubmitEmployee } from '../../state';
import { Observable } from 'rxjs';
import * as UserActions from 'src/app/features/user/state/user.actions';
import * as UserSelectors from 'src/app/features/user/state/user.selectors';
import { AppState } from 'src/app/state/state';

@Component({
  selector: 'tracker-employee-editor-form',
  templateUrl: './employee-editor-form.component.html',
  styleUrls: ['./employee-editor-form.component.scss']
})
export class EmployeeEditorFormComponent implements OnInit {

  @Input('props') props: any;
  
  public formGroup: FormGroup<any> | any;
  public company$: Observable<{ data: any, status: string }>;
  public groups$: Observable<{ data: any, status: string }>;
  public users$: Observable<{ data: any, status: string }>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.company$ = this.store.pipe(select(SelectEmployees));
    this.groups$ = this.store.pipe(select(UserSelectors.SelectGroups));
    this.users$ = this.store.pipe(select(UserSelectors.SelectUsers));
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.LoadGroups());
    this.store.dispatch(UserActions.LoadUsers());
  }
  
}
