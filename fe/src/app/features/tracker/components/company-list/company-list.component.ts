import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyEditorComponent } from '../company-editor/company-editor.component';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { TrackerState, LoadCompanies, SelectCompanies, DeleteCompany } from '../../state';
import { Observable, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'tracker-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  private onDestroy$: Subject<boolean> | any = new Subject<boolean>;
  
  public companies$: Observable<{ data: any, status: string }>;
  public displayedColumns: string[] = ['name', 'description', 'create_at', 'update_at', 'action'];
  public getScreenWidth: any;
  public getScreenHeight: any;
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  constructor(
    public dialog: MatDialog,
    private store: Store<TrackerState>,
    private actionsSubject$: ActionsSubject,
  ) {
    this.companies$ = this.store.pipe(select(SelectCompanies));

    // listen state changed
    this.actionsSubject$.pipe(takeUntil(this.onDestroy$)).subscribe(state => {
      switch (state.type) {
        case '[Tracker] Submit Company Success':
        case '[Tracker] Update Company Success':
          this.dialog.closeAll();
          break;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(LoadCompanies());

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  addHandler(data: any = {}): void {
    const dialogRef = this.dialog.open(CompanyEditorComponent, {
      data: data,
      width: '450px',
      maxWidth: '450px',
      autoFocus: false,
    });
  }

  editHandler(data: any): void {
    this.addHandler(data);
  }

  deleteHandler(pid: string | number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Sure, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(DeleteCompany({ pid: pid }));
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
