import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tracker-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<CompanyEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cancelHandler(): void {
    this.dialogRef.close();
  }

}
