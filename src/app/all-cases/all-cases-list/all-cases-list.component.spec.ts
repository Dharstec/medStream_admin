import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCasesListComponent } from './all-cases-list.component';

describe('AllCasesListComponent', () => {
  let component: AllCasesListComponent;
  let fixture: ComponentFixture<AllCasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCasesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
