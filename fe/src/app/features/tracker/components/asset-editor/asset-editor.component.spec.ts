import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetEditorComponent } from './asset-editor.component';

describe('AssetEditorComponent', () => {
  let component: AssetEditorComponent;
  let fixture: ComponentFixture<AssetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
