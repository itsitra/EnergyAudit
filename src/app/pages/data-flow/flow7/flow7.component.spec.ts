import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow7Component } from './flow7.component';

describe('Flow7Component', () => {
  let component: Flow7Component;
  let fixture: ComponentFixture<Flow7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
