import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tracker-asset-editor',
  templateUrl: './asset-editor.component.html',
  styleUrls: ['./asset-editor.component.scss']
})
export class AssetEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<AssetEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cancelHandler(): void {
    this.dialogRef.close();
  }

}
