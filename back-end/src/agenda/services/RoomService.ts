import { Room } from "../models/room.model";
export class RoomService {
    async findOneById(id: string): Promise<Room> {
        return new Room("1234567");
    }
}
