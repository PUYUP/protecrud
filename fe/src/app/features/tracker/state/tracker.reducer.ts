import { Action, createReducer, on } from '@ngrx/store';
import * as TrackerActions from './tracker.actions';
import { IDLE, LOADED, LOADING } from 'src/app/core/constants';

export const TrackerFeatureKey = 'tracker';

export interface TrackerState {
  company: {
    retrieve: {
      data: any
      status: string
      error: any,
    },
    list: {
      data: any
      status: string
      error: any
    },
  },
  employees: {
    data: any
    status: string
    error: any
  }
}

export const initialState: TrackerState = {
  company: {
    retrieve: {
      data: null,
      status: IDLE,
      error: null,
    },
    list: {
      data: null,
      status: IDLE,
      error: null
    },
  },
  employees: {
    data: null,
    status: IDLE,
    error: null,
  }
};

export const reducer = createReducer(
  initialState,

  // ...
  // SUBMIT COMPANY
  // ...
  on(TrackerActions.SubmitCompany, (state: TrackerState, payload: { data: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          data: payload.data,
          status: LOADING,
          error: null,
        }
      }
    }
  }),
  on(TrackerActions.SubmitCompanySuccess, (state: TrackerState, payload: { data: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          data: payload.data,
          status: LOADED,
          error: null,
        },
        list: {
          ...state.company.list,
          data: [payload.data, ...state.company.list.data],
        }
      }
    }
  }),
  on(TrackerActions.SubmitCompanyFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          status: IDLE,
          error: payload.error,
          data: null,
        }
      }
    }
  }),


  // ...
  // UPDATE COMPANY
  // ...
  on(TrackerActions.UpdateCompany, (state: TrackerState, payload: { pid: string | number, data: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          data: payload.data,
          status: LOADING,
          error: null,
        },
      }
    }
  }),
  on(TrackerActions.UpdateCompanySuccess, (state: TrackerState, payload: { data: any }) => {
    const INDEX = state.company.list.data.findIndex((obj: any) => obj.id == payload.data.id);

    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          data: payload.data,
          status: LOADED,
          error: null,
        },
        list: {
          ...state.company.list,
          data: [
            ...state.company.list.data.slice(0, INDEX),
            {
              ...state.company.list.data[INDEX],
              ...payload.data,
            },
            ...state.company.list.data.slice(INDEX + 1),
          ]
        }
      }
    }
  }),
  on(TrackerActions.UpdateCompanyFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          status: IDLE,
          error: payload.error,
          data: null,
        }
      }
    }
  }),


  // ...
  // DELETE COMPANY
  // ...
  on(TrackerActions.DeleteCompany, (state: TrackerState, payload: { pid: string | number }) => {
    return {
      ...state,
    }
  }),
  on(TrackerActions.DeleteCompanySuccess, (state: TrackerState, payload: { pid: string | number }) => {
    let companies = state.company.list.data.filter((obj: any) => obj.id != payload.pid);

    return {
      ...state,
      company: {
        ...state.company,
        list: {
          ...state.company.list,
          data: companies,
        }
      }
    }
  }),
  on(TrackerActions.DeleteCompanyFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
    }
  }),


  // ...
  // LOAD COMPANIES
  // ...
  on(TrackerActions.LoadCompanies, (state: TrackerState) => {
    return {
      ...state,
      company: {
        ...state.company,
        list: {
          ...state.company.list,
          data: [],
          status: LOADING,
          error: null,
        }
      }
    }
  }),
  on(TrackerActions.LoadCompaniesSuccess, (state: TrackerState, payload: { data: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        list: {
          ...state.company.list,
          data: payload.data,
          status: LOADED,
          error: null,
        }
      }
    }
  }),
  on(TrackerActions.LoadCompaniesFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        list: {
          status: IDLE,
          error: payload.error,
          data: null,
        }
      }
    }
  }),


  // ...
  // RETRIEVE COMPANY
  // ...
  on(TrackerActions.RetrieveCompany, (state: TrackerState) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          status: LOADING,
          error: null,
        }
      }
    }
  }),
  on(TrackerActions.RetrieveCompanySuccess, (state: TrackerState, payload: { data: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          data: payload.data,
          status: LOADED,
          error: null,
        }
      }
    }
  }),
  on(TrackerActions.RetrieveCompanyFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          status: IDLE,
          error: payload.error,
          data: null,
        }
      }
    }
  }),


  // ...
  // SUBMIT EMPLOYEE
  // ...
  on(TrackerActions.SubmitEmployee, (state: TrackerState) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        status: LOADING,
      }
    }
  }),
  on(TrackerActions.SubmitEmployeeSuccess, (state: TrackerState, payload: { data: any }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        data: payload.data,
        status: LOADED,
        error: null,
      }
    }
  }),
  on(TrackerActions.SubmitEmployeeFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        status: IDLE,
        error: payload.error,
      }
    }
  }),


  // ...
  // DELETE EMPLOYEE
  // ...
  on(TrackerActions.DeleteEmployee, (state: TrackerState, payload: { pid: string | number }) => {
    return {
      ...state,
    }
  }),
  on(TrackerActions.DeleteEmployeeSuccess, (state: TrackerState, payload: { pid: string | number }) => {
    let employees = state.company.retrieve.data.employees.filter((obj: any) => obj.id != payload.pid);

    return {
      ...state,
      company: {
        ...state.company,
        retrieve: {
          ...state.company.retrieve,
          data: {
            ...state.company.retrieve.data,
            employees: employees,
          }
        }
      }
    }
  }),
  on(TrackerActions.DeleteEmployeeFailure, (state: TrackerState, payload: { error: any }) => {
    return {
      ...state,
    }
  }),
);

export function TrackerReducer(state: TrackerState | undefined, action: Action) {
  return reducer(state, action);
}