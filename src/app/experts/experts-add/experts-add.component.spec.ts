import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsAddComponent } from './experts-add.component';

describe('ExpertsAddComponent', () => {
  let component: ExpertsAddComponent;
  let fixture: ComponentFixture<ExpertsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
