import { Component, Input } from '@angular/core';

@Component({
  selector: 'tracker-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent {

  @Input('props') props: any;
  
}
