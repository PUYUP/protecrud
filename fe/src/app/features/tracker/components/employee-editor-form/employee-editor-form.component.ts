import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { SelectEmployees, TrackerState } from '../../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tracker-employee-editor-form',
  templateUrl: './employee-editor-form.component.html',
  styleUrls: ['./employee-editor-form.component.scss']
})
export class EmployeeEditorFormComponent implements OnInit {

  @Input('props') props: any;
  
  public formGroup: FormGroup<any> | any;
  public company$: Observable<{ data: any, status: string }>;

  constructor(
    private fb: FormBuilder,
    private store: Store<TrackerState>,
  ) {
    this.company$ = this.store.pipe(select(SelectEmployees));
  }

  ngOnInit(): void {
    
  }
  
}
