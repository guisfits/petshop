import { BookRoomCommand } from '../book-room.command';
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { RoomService } from '../../services/room.service';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    
    constructor(private readonly service: RoomService) { }

    async execute(command: BookRoomCommand): Promise<any> {
        console.log("BookRoomCommand:Handler");
        
        const room = await this.service.findOneById(command.roomId);
        room.book(command.customerId);
        //room.commit();
    }
}