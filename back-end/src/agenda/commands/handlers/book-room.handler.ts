import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Cookie } from 'cookiejar';
import { BookRoomCommand } from '../book-room.command';
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { RoomService } from '../../services/room.service';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {

    constructor(private readonly service: RoomService) { }

    async execute(command: BookRoomCommand): Promise<any> {
        const room = await this.service.checkAvaiability(command.roomId, command.date);
        if (!room) throw new HttpException("Sala não disponível", HttpStatus.BAD_REQUEST);

        room.book(command.customerId, command.date);
        await this.service.book(room);
    }
}