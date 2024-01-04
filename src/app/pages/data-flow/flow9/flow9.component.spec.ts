import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow9Component } from './flow9.component';

describe('Flow9Component', () => {
  let component: Flow9Component;
  let fixture: ComponentFixture<Flow9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
