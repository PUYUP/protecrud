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


  // ...
  // UPDATE EMPLOYEE
  // ...
  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateEmployee),
      mergeMap((payload: { pid: string | number, data: { roles: number[] } }) => {
        return this.trackerService.UpdateEmployee(payload.pid, payload.data).pipe(
          map((response: any) => {
            return TrackerActions.UpdateEmployeeSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.UpdateEmployeeFailure({ error: err }));
          })
        )
      })
    )
  )

  updateEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateEmployeeSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  updateEmployeeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateEmployeeFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // DELETE EMPLOYEE
  // ...
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteEmployee),
      mergeMap((payload: { pid: string | number }) => {
        return this.trackerService.DeleteEmployee(payload.pid).pipe(
          map(() => {
            return TrackerActions.DeleteEmployeeSuccess({ pid: payload.pid });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.DeleteEmployeeFailure({ error: err, pid: payload.pid }));
          })
        )
      })
    )
  )

  deleteEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteEmployeeSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  deleteEmployeeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteEmployeeFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )





  // ...
  // SUBMIT ASSET
  // ...
  submitAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitAsset),
      mergeMap((payload: { data: { company: number; quantity: number, name: string; description?: string } }) => {
        return this.trackerService.SubmitAsset(payload.data).pipe(
          map((response: any) => {
            return TrackerActions.SubmitAssetSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.SubmitAssetFailure({ error: err }));
          })
        )
      })
    )
  )

  submitAssetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitAssetSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  submitAssetFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.SubmitAssetFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // UPDATE ASSET
  // ...
  updateAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateAsset),
      mergeMap((payload: { pid: string | number, data: { quantity: number, name: string; description?: string } }) => {
        return this.trackerService.UpdateAsset(payload.pid, payload.data).pipe(
          map((response: any) => {
            return TrackerActions.UpdateAssetSuccess({ data: response });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.UpdateAssetFailure({ error: err }));
          })
        )
      })
    )
  )

  updateAssetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateAssetSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  updateAssetFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.UpdateAssetFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )


  // ...
  // DELETE ASSET
  // ...
  deleteAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteAsset),
      mergeMap((payload: { pid: string | number }) => {
        return this.trackerService.DeleteAsset(payload.pid).pipe(
          map(() => {
            return TrackerActions.DeleteAssetSuccess({ pid: payload.pid });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(TrackerActions.DeleteAssetFailure({ error: err, pid: payload.pid }));
          })
        )
      })
    )
  )

  deleteAssetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteAssetSuccess),
      map(data => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  deleteAssetFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackerActions.DeleteAssetFailure),
      map(({ error }) => {
        console.log(error);
        this.handleError(error);
      })
    ), { dispatch: false }
  )

}
