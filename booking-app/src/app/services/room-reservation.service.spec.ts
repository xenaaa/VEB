import { TestBed, inject } from '@angular/core/testing';

import { RoomReservationService } from './room-reservation.service';

describe('RoomReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomReservationService]
    });
  });

  it('should be created', inject([RoomReservationService], (service: RoomReservationService) => {
    expect(service).toBeTruthy();
  }));
});
