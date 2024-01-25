import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllCasesComponent } from './add-all-cases.component';

describe('AddAllCasesComponent', () => {
  let component: AddAllCasesComponent;
  let fixture: ComponentFixture<AddAllCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAllCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
