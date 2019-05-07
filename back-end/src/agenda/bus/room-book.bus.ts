import { BookRoomCommand } from './../commands/book-room.command';
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class RoomBookBus {
    constructor(private readonly commandBus: CommandBus) {}

    async Book(customerId: string, roomId: string) {
        return await this.commandBus.execute(
            new BookRoomCommand(customerId, roomId)
        );
    }
}