import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillManagementComponent } from './mill-management.component';

describe('MillManagementComponent', () => {
  let component: MillManagementComponent;
  let fixture: ComponentFixture<MillManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MillManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MillManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
