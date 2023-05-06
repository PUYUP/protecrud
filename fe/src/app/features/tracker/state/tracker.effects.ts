import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TrackerActions from './tracker.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrackerService } from '../services/tracker.service';


@Injectable()
export class TrackerEffects {

  constructor(
    private actions$: Actions,
    private trackerService: TrackerService,
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
  // SUBMIT COMPANY
  // ...
  submitCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitCompany),
      mergeMap((payload: { data: { name: string, description?: string } }) => {
        return this.trackerService.SubmitCompany(payload.data).pipe(
          map((response: any) => {
            return TrackerActions.SubmitCompanySuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.SubmitCompanyFailure({ error: err }));
          })
        )
      })
    )
  )

  submitCompanySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitCompanySuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  submitCompanyFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitCompanyFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // UPDATE COMPANY
  // ...
  updateCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateCompany),
      mergeMap((payload: { pid: string | number, data: { name: string, description?: string } }) => {
        return this.trackerService.UpdateCompany(payload.pid, payload.data).pipe(
          map((response: any) => {
            return TrackerActions.UpdateCompanySuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.UpdateCompanyFailure({ error: err }));
          })
        )
      })
    )
  )

  updateCompanySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateCompanySuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  updateCompanyFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateCompanyFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // DELETE COMPANY
  // ...
  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteCompany),
      mergeMap((payload: { pid: string | number }) => {
        return this.trackerService.DeleteCompany(payload.pid).pipe(
          map(() => {
            return TrackerActions.DeleteCompanySuccess({ pid: payload.pid });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.DeleteCompanyFailure({ error: err, pid: payload.pid }));
          })
        )
      })
    )
  )

  deleteCompanySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteCompanySuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  deleteCompanyFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteCompanyFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // LOAD COMPANIES
  // ...
  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.LoadCompanies),
      mergeMap(() => {
        return this.trackerService.LoadCompanies().pipe(
          map((response: any) => {
            return TrackerActions.LoadCompaniesSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.LoadCompaniesFailure({ error: err }));
          })
        )
      })
    )
  )

  loadCompaniesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.LoadCompaniesSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  loadCompaniesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.LoadCompaniesFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE COMPANY
  // ...
  retrieveCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.RetrieveCompany),
      mergeMap((payload: { pid: string | number }) => {
        return this.trackerService.RetrieveCompany(payload.pid).pipe(
          map((response: any) => {
            return TrackerActions.RetrieveCompanySuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.RetrieveCompanyFailure({ error: err }));
          })
        )
      })
    )
  )

  retrieveCompanySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.RetrieveCompanySuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  retrieveCompanyFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.RetrieveCompanyFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // SUBMIT EMPLOYEE
  // ...
  submitEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitEmployee),
      mergeMap((payload: { data: { company: number, user: number, roles: number[] } }) => {
        return this.trackerService.SubmitEmployee(payload.data).pipe(
          map((response: any) => {
            return TrackerActions.SubmitEmployeeSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.SubmitEmployeeFailure({ error: err }));
          })
        )
      })
    )
  )

  submitEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitEmployeeSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  submitEmployeeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitEmployeeFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )

}
