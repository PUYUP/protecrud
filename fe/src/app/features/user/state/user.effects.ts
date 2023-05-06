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

}
