import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { IDLE, LOADED, LOADING } from 'src/app/core/constants';

export const UserFeatureKey = 'user';

export interface UserState {
  authentication: {
    data: any
    status: string
    error: any
  },
  groups: {
    data: any
    status: string
    error: any
  },
  users: {
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
  },
  groups: {
    data: null,
    status: IDLE,
    error: null
  },
  users: {
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
  }),


  // ...
  // LOAD GROUPS
  // ...
  on(UserActions.LoadGroups, (state: UserState) => {
    return {
      ...state,
      groups: {
        ...state.groups,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(UserActions.LoadGroupsSuccess, (state: UserState, payload: { data: any }) => {
    return {
      ...state,
      groups: {
        ...state.groups,
        data: payload.data,
        status: LOADED,
        error: null,
      }
    }
  }),
  on(UserActions.LoadGroupsFailure, (state: UserState, payload: { error: any }) => {
    return {
      ...state,
      groups: {
        ...state.groups,
        status: IDLE,
        error: payload.error,
      }
    }
  }),


  // ...
  // LOAD USERS
  // ...
  on(UserActions.LoadUsers, (state: UserState) => {
    return {
      ...state,
      users: {
        ...state.users,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(UserActions.LoadUsersSuccess, (state: UserState, payload: { data: any }) => {
    return {
      ...state,
      users: {
        ...state.users,
        data: payload.data,
        status: LOADED,
        error: null,
      }
    }
  }),
  on(UserActions.LoadUsersFailure, (state: UserState, payload: { error: any }) => {
    return {
      ...state,
      users: {
        ...state.users,
        status: IDLE,
        error: payload.error,
      }
    }
  }),


  // ...
  // SIGNUP
  // ...
  on(UserActions.SignUp, (state: UserState) => {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(UserActions.SignUpSuccess, (state: UserState) => {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        status: LOADED,
        error: null,
      }
    }
  }),
  on(UserActions.SignUpFailure, (state: UserState, payload: { error: any }) => {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        status: IDLE,
        error: payload.error,
        data: null,
      }
    }
  }),
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}