import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow11Component } from './flow11.component';

describe('Flow11Component', () => {
  let component: Flow11Component;
  let fixture: ComponentFixture<Flow11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
