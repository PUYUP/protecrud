import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetEditorFormComponent } from './asset-editor-form.component';

describe('AssetEditorFormComponent', () => {
  let component: AssetEditorFormComponent;
  let fixture: ComponentFixture<AssetEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
