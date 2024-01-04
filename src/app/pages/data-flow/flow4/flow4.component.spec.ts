import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow4Component } from './flow4.component';

describe('FlowFourComponent', () => {
  let component: Flow4Component;
  let fixture: ComponentFixture<Flow4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
