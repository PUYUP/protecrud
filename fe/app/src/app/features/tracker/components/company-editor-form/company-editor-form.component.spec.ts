import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditorFormComponent } from './company-editor-form.component';

describe('CompanyEditorFormComponent', () => {
  let component: CompanyEditorFormComponent;
  let fixture: ComponentFixture<CompanyEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
