import { User } from './user';
import { Room } from './room';

export class RoomReservation {
    public Id: number;
    public StartDate: Date;
    public EndDate: Date;
    public TimeStamp: Date;
    public AppUserId: number;
    public AppUser: User ;
    public RoomId: number;
    public Room: Room;

    constructor(){}
}