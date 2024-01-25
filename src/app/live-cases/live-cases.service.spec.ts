import { TestBed } from '@angular/core/testing';

import { LiveCasesService } from './live-cases.service';

describe('LiveCasesService', () => {
  let service: LiveCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
