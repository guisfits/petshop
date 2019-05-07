import { Room } from "../models/room.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoomService {
    async findOneById(id: string): Promise<Room> {
        return new Room("1234567");
    }
}