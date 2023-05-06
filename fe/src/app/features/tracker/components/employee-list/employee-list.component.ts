import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditorComponent } from '../employee-editor/employee-editor.component';
import Swal from 'sweetalert2';
import { DeleteEmployee, RetrieveCompany } from '../../state';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/state';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'tracker-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  private onDestroy$: Subject<boolean> | any = new Subject<boolean>;
  public displayedColumns: string[] = ['name', 'roles', 'create_at', 'action'];
  
  @Input('props') props: any;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
  ) {
    // listen state changed
    this.actionsSubject$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      switch (state.type) {
        case '[Tracker] Submit Employee Success':
        case '[Tracker] Update Employee Success':
          this.dialog.closeAll();
          this.store.dispatch(RetrieveCompany({ pid: state.data.company }));
          break;
      }
    });
  }

  addEmployeeHandler(data: any = {}): void {
    const dialogRef = this.dialog.open(EmployeeEditorComponent, {
      data: {
        ...data,
        company: this.props.pid,
      },
      autoFocus: false,
      maxWidth: '450px',
      width: '450px',
    });
  }

  editHandler(data: any): void {
    this.addEmployeeHandler(data);
  }

  deleteHandler(pid: string | number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Sure, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(DeleteEmployee({ pid: pid }));
      }
    });
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
