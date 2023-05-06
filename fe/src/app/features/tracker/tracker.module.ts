import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkColumnDef } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TrackerRoutingModule } from './tracker-routing.module';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { TrackerComponent } from './tracker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyEditorComponent } from './components/company-editor/company-editor.component';
import { CompanyEditorFormComponent } from './components/company-editor-form/company-editor-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailPageComponent } from './pages/company-detail-page/company-detail-page.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditorComponent } from './components/employee-editor/employee-editor.component';
import { EmployeeEditorFormComponent } from './components/employee-editor-form/employee-editor-form.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';


@NgModule({
  declarations: [
    IndexPageComponent,
    CompanyListComponent,
    CompanyItemComponent,
    TrackerComponent,
    CompanyEditorComponent,
    CompanyEditorFormComponent,
    CompanyDetailPageComponent,
    CompanyDetailComponent,
    EmployeeListComponent,
    EmployeeEditorComponent,
    EmployeeEditorFormComponent,
    AssetListComponent
  ],
  entryComponents: [
    CompanyListComponent,
    CompanyItemComponent,
    CompanyEditorComponent,
    CompanyEditorFormComponent,
    CompanyDetailComponent,
    EmployeeListComponent,
    EmployeeEditorComponent,
    EmployeeEditorFormComponent,
    AssetListComponent,
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [
    CdkColumnDef
  ]
})
export class TrackerModule { }
