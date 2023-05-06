import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditorComponent } from '../employee-editor/employee-editor.component';

@Component({
  selector: 'tracker-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  public displayedColumns: string[] = ['name', 'roles', 'create_at', 'action'];
  
  @Input('props') props: any;

  constructor(private matDialog: MatDialog) {}

  addEmployeeHandler(data: any = {}): void {
    const dialogRef = this.matDialog.open(EmployeeEditorComponent, {
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

  }

}
