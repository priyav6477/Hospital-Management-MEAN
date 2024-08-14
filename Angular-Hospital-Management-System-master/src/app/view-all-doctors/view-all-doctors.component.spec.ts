import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewALlDoctorsComponent } from './view-all-doctors.component';

describe('ViewALlDoctorsComponent', () => {
  let component: ViewALlDoctorsComponent;
  let fixture: ComponentFixture<ViewALlDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewALlDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewALlDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
