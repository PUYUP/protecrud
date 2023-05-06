import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tracker-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.scss']
})
export class EmployeeEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<EmployeeEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cancelHandler(): void {
    this.dialogRef.close();
  }
  
}
