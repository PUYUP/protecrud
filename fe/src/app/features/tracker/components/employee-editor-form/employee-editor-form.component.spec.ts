import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditorFormComponent } from './employee-editor-form.component';

describe('EmployeeEditorFormComponent', () => {
  let component: EmployeeEditorFormComponent;
  let fixture: ComponentFixture<EmployeeEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
