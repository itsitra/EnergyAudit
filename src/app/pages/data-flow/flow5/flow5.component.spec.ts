import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow5Component } from './flow5.component';

describe('Flow5Component', () => {
  let component: Flow5Component;
  let fixture: ComponentFixture<Flow5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
