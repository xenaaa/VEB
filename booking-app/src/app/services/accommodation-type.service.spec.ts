import { TestBed, inject } from '@angular/core/testing';

import { AccommodationTypeService } from './accommodation-type.service';

describe('AccommodationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccommodationTypeService]
    });
  });

  it('should be created', inject([AccommodationTypeService], (service: AccommodationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
