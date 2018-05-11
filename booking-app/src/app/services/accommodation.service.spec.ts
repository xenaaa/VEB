import { TestBed, inject } from '@angular/core/testing';

import { AccommodationService } from './accommodation.service';

describe('AccommodationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccommodationService]
    });
  });

  it('should be created', inject([AccommodationService], (service: AccommodationService) => {
    expect(service).toBeTruthy();
  }));
});
