import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { TrackerState, SubmitCompany, SelectCompany, UpdateCompany } from '../../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tracker-company-editor-form',
  templateUrl: './company-editor-form.component.html',
  styleUrls: ['./company-editor-form.component.scss']
})
export class CompanyEditorFormComponent implements OnInit {

  @Input('props') props: any;
  
  public formGroup: FormGroup<any> | any;
  public company$: Observable<{ data: any, status: string }>;

  constructor(
    private fb: FormBuilder,
    private store: Store<TrackerState>,
  ) {
    this.company$ = this.store.pipe(select(SelectCompany));
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });

    if (this.props?.data) {
      this.formGroup.patchValue({
        name: this.props.data.name,
        description: this.props.data.description,
      });
    }
  }

  onSubmitHandler(): void {
    if (this.props?.data?.id) {
      // edit
      this.store.dispatch(UpdateCompany({ pid: this.props.data.id, data: this.formGroup.value }));
    }
    else {
      // create
      this.store.dispatch(SubmitCompany({ data: this.formGroup.value }));
    }
  }

}
