import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow8Component } from './flow8.component';

describe('Flow8Component', () => {
  let component: Flow8Component;
  let fixture: ComponentFixture<Flow8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
