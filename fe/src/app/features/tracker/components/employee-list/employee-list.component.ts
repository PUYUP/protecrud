import { Component, Input } from '@angular/core';

@Component({
  selector: 'tracker-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  public displayedColumns: string[] = ['name', 'roles', 'create_at', 'action'];
  
  @Input('props') props: any;
  
}
