import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { SelectAuthentication, SignUp, UserState } from '../../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  public formGroup: FormGroup | any;
  public authentication$: Observable<{ data: any, status: string }>;

  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>,
  ) {
    this.authentication$ = this.store.pipe(select(SelectAuthentication));
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitHandler(): void {
    this.store.dispatch(SignUp({ data: this.formGroup.value }));
  }

}
