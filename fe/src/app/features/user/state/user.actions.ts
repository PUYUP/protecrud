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


// ...
// LOAD GROUPS
// ...
export const LoadGroups = createAction(
  '[User] Load Groups'
);

export const LoadGroupsSuccess = createAction(
  '[User] Load Groups Success',
  props<{ data: any }>()
);

export const LoadGroupsFailure = createAction(
  '[User] Load Groups Failure',
  props<{ error: any }>()
);


// ...
// LOAD USERS
// ...
export const LoadUsers = createAction(
  '[User] Load Users'
);

export const LoadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: any }>()
);

export const LoadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);