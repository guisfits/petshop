import { IEventHandler } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../room-booked.event";

export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {
    
    handle(event: RoomBookedEvent) {
        console.log("RoomBookedEvent:handler - Manipulando o evento Room Booked...");
    }
}