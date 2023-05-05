import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { IDLE, LOADED, LOADING } from 'src/app/core/constants';

export const UserFeatureKey = 'user';

export interface UserState {
  authentication: {
    data: any
    status: string
    error: any
  }
}

export const initialState: UserState = {
  authentication: {
    data: null,
    status: IDLE,
    error: null
  }
};

export const reducer = createReducer(
  initialState,

  // ...
  // AUTHENTICATION
  // ...
  on(UserActions.Authentication, (state: UserState) => {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(UserActions.AuthenticationSuccess, (state: UserState, payload: { data: any }) => {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        data: payload.data,
        status: LOADED,
        error: null,
      }
    }
  }),
  on(UserActions.AuthenticationFailure, (state: UserState, payload: { error: any }) => {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        status: IDLE,
        error: payload.error,
        data: null,
      }
    }
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}