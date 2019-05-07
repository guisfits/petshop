import { EventHandlers } from './events/index';
import { CommandHandlers } from './commands/index';
import { CommandHandler } from '@nestjs/cqrs';
import { RoomBookBus } from './bus/room-book.bus';
import { AgendaController } from './controllers/agenda.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomService } from './services/RoomService';

@Module({
    imports: [
        CqrsModule
    ],
    controllers: [
        AgendaController
    ],
    providers: [
        RoomBookBus,
        RoomService,
        ...CommandHandlers,
        ...EventHandlers
    ]
})
export class AgendaModule {}
