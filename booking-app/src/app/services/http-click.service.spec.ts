import { TestBed, inject } from '@angular/core/testing';

import { HttpClickService } from './http-click.service';

describe('HttpClickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClickService]
    });
  });

  it('should be created', inject([HttpClickService], (service: HttpClickService) => {
    expect(service).toBeTruthy();
  }));
});
