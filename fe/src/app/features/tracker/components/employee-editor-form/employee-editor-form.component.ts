import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { SelectEmployees, SubmitEmployee, UpdateEmployee } from '../../state';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  
  private onDestroy$: Subject<boolean> | any = new Subject<false>;

  public groups: any[] | any;
  public formGroup: FormGroup<any> | any;
  public company$: Observable<{ data: any, status: string }>;
  public groups$: Observable<{ data: any, status: string }>;
  public users$: Observable<{ data: any, status: string }>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
  ) {
    this.company$ = this.store.pipe(select(SelectEmployees));
    this.groups$ = this.store.pipe(select(UserSelectors.SelectGroups));
    this.users$ = this.store.pipe(select(UserSelectors.SelectUsers));

    // listen state changed
    this.actionsSubject$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      switch (state.type) {
        case '[User] Load Groups Success':
          this.groups = state.data?.results;
          break;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.LoadGroups());
    this.store.dispatch(UserActions.LoadUsers());

    this.formGroup = this.fb.group({
      user: ['', [Validators.required]],
      roles: ['', [Validators.required]],
    });

    if (this.props?.data?.id) {
      this.formGroup.patchValue({
        user: this.props.data.user,
        roles: this.props.data.roles,
      });
    }
  }

  submitHandler(): void {
    const groupsId = this.formGroup.value.roles.map((obj: any) => obj.id);
    const payload = {
      ...this.formGroup.value,
      roles: groupsId,
      company: parseInt(this.props.data?.company),
    }

    if (this.props.data?.id) {
      // update
      this.store.dispatch(UpdateEmployee({ pid: this.props.data.id, data: payload }));
    }
    else {
      // create
      this.store.dispatch(SubmitEmployee({ data: payload }));
    }
  }

  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1.name === o2 : o1 === o2;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
  
}
