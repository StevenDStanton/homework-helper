import { TestBed } from '@angular/core/testing';

import { SpellingDataService } from './spelling-data.service';

describe('SpellingDataService', () => {
  let service: SpellingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
