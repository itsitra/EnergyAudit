import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow3Component } from './flow3.component';

describe('FlowThreeComponent', () => {
  let component: Flow3Component;
  let fixture: ComponentFixture<Flow3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
