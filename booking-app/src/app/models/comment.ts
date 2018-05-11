import { Accommodation } from './accommodation';
import { User } from './user';

export class Comment {
  constructor(
    public Id: number,
    public Grade: number,
    public Text: string,
    public AppUser: User,
    public AppUserId: number,
    public Accommodation: Accommodation,
    public AccommodationId: number
){}
}