import { TestBed } from '@angular/core/testing';

import { AllCasesService } from './all-cases.service';

describe('AllCasesService', () => {
  let service: AllCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
