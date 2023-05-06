import { createAction, props } from '@ngrx/store';

// ...
// SUBMIT COMPANY
// ...
export const SubmitCompany = createAction(
  '[Tracker] Submit Company',
  props<{ data: { name: string; description?: string } }>()
);

export const SubmitCompanySuccess = createAction(
  '[Tracker] Submit Company Success',
  props<{ data: any }>()
);

export const SubmitCompanyFailure = createAction(
  '[Tracker] Submit Company Failure',
  props<{ error: any }>()
);


// ...
// UPDATE COMPANY
// ...
export const UpdateCompany = createAction(
  '[Tracker] Update Company',
  props<{ pid: string | number, data: { name: string; description?: string } }>()
);

export const UpdateCompanySuccess = createAction(
  '[Tracker] Update Company Success',
  props<{ data: any }>()
);

export const UpdateCompanyFailure = createAction(
  '[Tracker] Update Company Failure',
  props<{ error: any }>()
);


// ...
// DELETE COMPANY
// ...
export const DeleteCompany = createAction(
  '[Tracker] Delete Company',
  props<{ pid: string | number }>()
);

export const DeleteCompanySuccess = createAction(
  '[Tracker] Delete Company Success',
  props<{ pid: string | number }>()
);

export const DeleteCompanyFailure = createAction(
  '[Tracker] Delete Company Failure',
  props<{ error: any, pid: string | number }>()
);


// ...
// LOAD COMPANIES
// ...
export const LoadCompanies = createAction(
  '[Tracker] Load Companies',
);

export const LoadCompaniesSuccess = createAction(
  '[Tracker] Load Companies Success',
  props<{ data: any, params?: any }>()
);

export const LoadCompaniesFailure = createAction(
  '[Tracker] Load Companies Failure',
  props<{ error: any, params?: any }>()
);


// ...
// RETRIEVE COMPANY
// ...
export const RetrieveCompany = createAction(
  '[Tracker] Retrieve Company',
  props<{ pid: string | number }>()
);

export const RetrieveCompanySuccess = createAction(
  '[Tracker] Retrieve Company Success',
  props<{ data: any }>()
);

export const RetrieveCompanyFailure = createAction(
  '[Tracker] Retrieve Company Failure',
  props<{ error: any }>()
);


// ...
// SUBMIT EMPLOYEE
// ...
export const SubmitEmployee = createAction(
  '[Tracker] Submit Employee',
  props<{ data: { company: number; user: number, roles: number[] } }>()
);

export const SubmitEmployeeSuccess = createAction(
  '[Tracker] Submit Employee Success',
  props<{ data: any }>()
);

export const SubmitEmployeeFailure = createAction(
  '[Tracker] Submit Employee Failure',
  props<{ error: any }>()
);


// ...
// UPDATE EMPLOYEE
// ...
export const UpdateEmployee = createAction(
  '[Tracker] Update Employee',
  props<{ pid: string | number, data: { roles: number[] } }>()
);

export const UpdateEmployeeSuccess = createAction(
  '[Tracker] Update Employee Success',
  props<{ data: any }>()
);

export const UpdateEmployeeFailure = createAction(
  '[Tracker] Update Employee Failure',
  props<{ error: any }>()
);


// ...
// DELETE EMPLOYEE
// ...
export const DeleteEmployee = createAction(
  '[Tracker] Delete Employee',
  props<{ pid: string | number }>()
);

export const DeleteEmployeeSuccess = createAction(
  '[Tracker] Delete Employee Success',
  props<{ pid: string | number }>()
);

export const DeleteEmployeeFailure = createAction(
  '[Tracker] Delete Employee Failure',
  props<{ error: any, pid: string | number }>()
);