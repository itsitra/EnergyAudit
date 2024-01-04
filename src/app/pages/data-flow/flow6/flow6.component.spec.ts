import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flow6Component } from './flow6.component';

describe('Flow6Component', () => {
  let component: Flow6Component;
  let fixture: ComponentFixture<Flow6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flow6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flow6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
