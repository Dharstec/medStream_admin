import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiveCasesComponent } from './add-live-cases.component';

describe('AddLiveCasesComponent', () => {
  let component: AddLiveCasesComponent;
  let fixture: ComponentFixture<AddLiveCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLiveCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLiveCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
