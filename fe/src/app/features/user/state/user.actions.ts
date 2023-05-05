import { createAction, props } from '@ngrx/store';

// ...
// AUTHENTICATION
// ...
export const Authentication = createAction(
  '[User] Authentication',
  props<{ data: { username: string; password: string } }>()
);

export const AuthenticationSuccess = createAction(
  '[User] Authentication Success',
  props<{ data: any }>()
);

export const AuthenticationFailure = createAction(
  '[User] Authentication Failure',
  props<{ error: any }>()
);
