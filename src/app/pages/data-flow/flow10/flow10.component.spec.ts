import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow10Component } from './flow10.component';

describe('Flow10Component', () => {
  let component: Flow10Component;
  let fixture: ComponentFixture<Flow10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
