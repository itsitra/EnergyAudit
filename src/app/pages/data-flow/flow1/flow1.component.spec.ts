import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow1Component } from './flow1.component';

describe('FlowOneComponent', () => {
  let component: Flow1Component;
  let fixture: ComponentFixture<Flow1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
