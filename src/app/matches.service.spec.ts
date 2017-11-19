import { TestBed, inject } from '@angular/core/testing';

import { MatchesService } from './matches.service';

describe('MatchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchesService]
    });
  });

  it('should be created', inject([MatchesService], (service: MatchesService) => {
    expect(service).toBeTruthy();
  }));
});
