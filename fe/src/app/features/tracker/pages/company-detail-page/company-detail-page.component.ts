import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RetrieveCompany, SelectCompany, TrackerState } from '../../state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditorComponent } from '../../components/employee-editor/employee-editor.component';

@Component({
  selector: 'tracker-company-detail-page',
  templateUrl: './company-detail-page.component.html',
  styleUrls: ['./company-detail-page.component.scss']
})
export class CompanyDetailPageComponent implements OnInit {

  public pid: string | number | any;
  public company$: Observable<{ data: any, status: string }>;
  
  constructor(
    private store: Store<TrackerState>,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
  ) {
    this.company$ = this.store.pipe(select(SelectCompany));
  }

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('pid');
    
    if (this.pid) {
      this.store.dispatch(RetrieveCompany({ pid: this.pid }));
    }
  }

  addEmployeeHandler(data: any = {}): void {
    const dialogRef = this.matDialog.open(EmployeeEditorComponent, {
      data: data,
      autoFocus: false,
      maxWidth: '450px',
      width: '450px',
    });
  }

}
