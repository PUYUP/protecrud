import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { UserRoutingModule } from './user-routing.module';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';


@NgModule({
  declarations: [
    AuthenticationPageComponent,
    AuthenticationFormComponent,
    SignupFormComponent,
    SignupPageComponent
  ],
  entryComponents: [
    AuthenticationFormComponent,
    SignupFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class UserModule { }
