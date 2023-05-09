import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../services';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  private handleError(error: HttpErrorResponse): void{
    const STATUS = error.status;

    if (STATUS === 401) {
      Swal.fire({
        icon: 'error',
        text: error.error.detail,
      });
    }
  }

  // ...
  // AUTHENTICATION
  // ...
  authentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Authentication),
      mergeMap((payload: { data: { username: string, password: string } }) => {
        return this.authService.Authentication(payload.data).pipe(
          map((response: any) => {
            return UserActions.AuthenticationSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(UserActions.AuthenticationFailure({ error: err }));
          })
        )
      })
    )
  )

  authenticationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AuthenticationSuccess),
      map(data => {
        console.log(data);
        this.authService.SaveToken(data.data);
        this.router.navigate(['/tracker'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  authenticationFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AuthenticationFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // LOAD GROUPS
  // ...
  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadGroups),
      mergeMap(() => {
        return this.authService.LoadGroups().pipe(
          map((response: any) => {
            return UserActions.LoadGroupsSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(UserActions.LoadGroupsFailure({ error: err }));
          })
        )
      })
    )
  )

  loadGroupsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadGroupsSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  loadGroupsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadGroupsFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // LOAD USERS
  // ...
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadUsers),
      mergeMap(() => {
        return this.authService.LoadUsers().pipe(
          map((response: any) => {
            return UserActions.LoadUsersSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(UserActions.LoadUsersFailure({ error: err }));
          })
        )
      })
    )
  )

  loadUsersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadUsersSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  loadUsersFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadUsersFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // LOGOUT
  // ...
  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LogOut),
      mergeMap(() => {
        return this.authService.LogOut().pipe(
          map((response: any) => {
            return UserActions.LogOutSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(UserActions.LogOutFailure({ error: err }));
          })
        )
      })
    )
  )

  logOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LogOutSuccess),
      map(data => {
        console.log(data);
        this.router.navigate(['/user/authentication']);
      })
    ), { dispatch: false }
  )

  logOutFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LogOutFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )

}
