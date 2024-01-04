import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow2Component } from './flow2.component';

describe('FlowTwoComponent', () => {
  let component: Flow2Component;
  let fixture: ComponentFixture<Flow2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
