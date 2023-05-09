import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UserState, Authentication, SelectAuthentication } from '../../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {

  public formGroup: FormGroup<any> | any;
  public authentication$: Observable<{ data: any, status: string }>;

  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>,
  ) {
    this.authentication$ = this.store.pipe(select(SelectAuthentication));
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitHandler(): void {
    this.store.dispatch(Authentication({ data: this.formGroup.value }));
  }

}
