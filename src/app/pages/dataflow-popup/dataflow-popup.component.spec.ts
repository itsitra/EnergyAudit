import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowPopupComponent } from './dataflow-popup.component';

describe('DataflowPopupComponent', () => {
  let component: DataflowPopupComponent;
  let fixture: ComponentFixture<DataflowPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataflowPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataflowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
