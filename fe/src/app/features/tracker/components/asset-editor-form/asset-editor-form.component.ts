import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubmitAsset, TrackerState, UpdateAsset } from '../../state';

@Component({
  selector: 'tracker-asset-editor-form',
  templateUrl: './asset-editor-form.component.html',
  styleUrls: ['./asset-editor-form.component.scss']
})
export class AssetEditorFormComponent implements OnInit {

  @Input('props') props: any;

  public formGroup: FormGroup<any> | any;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<TrackerState>,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      description: [''],
    });

    if (this.props?.data?.id) {
      this.formGroup.patchValue({
        name: this.props.data.name,
        quantity: this.props.data.quantity,
        condition: this.props.data.condition,
        description: this.props.data.description,
      });
    }
  }

  onSubmitHandler(): void {
    const payload = {
      ...this.formGroup.value,
      company: parseInt(this.props.data?.company),
    }

    if (this.props?.data?.id) {
      // edit
      this.store.dispatch(UpdateAsset({ pid: this.props.data.id, data: payload }));
    }
    else {
      // create
      this.store.dispatch(SubmitAsset({ data: payload }));
    }
  }

}
