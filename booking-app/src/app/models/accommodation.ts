import { AccommodationType } from './accommodation-type';
import { User } from './user';
import { Place } from './place';
import { Room } from './room';
export class Accommodation {
    Id: number;
    Name: string;
    Description: string;
    Address: string;
    AvrageGrade: number;
    Latitude: number;
    Longitude: number;
    ImageUrl: string;
    Approved: boolean;
    PlaceId: number;
    AccommodationTypeId: number;
    OwnerId: number;
    Place: Place;
    Rooms: Room[];
    Owner: User;
    AccommodationType: AccommodationType;

      constructor(Id?: number, Name?: string, Description?: string, Address?: string, Approved? : boolean, 
        ImageUrl? : string, Latitude?: number, Longitude?: number, PlaceId?: number, AccommodationTypeId?: number, OwnerId?: number
        ) {

      this.Id = Id;
      this.Name = Name;
      this.Description = Description;
      this.Address = Address;
      this.Latitude = Latitude;
      this.Longitude = Longitude;
      this.Rooms = [];
      this.Approved = Approved;
      this.ImageUrl = ImageUrl;
      this.AccommodationType = new AccommodationType;
      this.Place = new Place();
      this.PlaceId = PlaceId;
      this.AccommodationTypeId = AccommodationTypeId;
      this.OwnerId = OwnerId;
    }
}
