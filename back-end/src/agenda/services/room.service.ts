import { Room } from "../models/room.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoomService {
    async checkAvaiability(id: string, date: Date): Promise<Room> {
        return new Room("123456");
    }

    async book(room: Room){
        
    }
}