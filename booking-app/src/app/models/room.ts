import { Accommodation } from "./accommodation";

export class Room {
    constructor(
      public Id?: number,
      public RoomNumber?: number,
      public BedCount?: number,
      public Description?: string,
      public PricePerNight?: number,
      public AccomodationId?: number,
      public Accommodation?: Accommodation
      ) {}
  }
  