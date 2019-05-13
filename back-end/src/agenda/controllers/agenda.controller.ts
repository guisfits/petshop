import { BookRoomCommand } from './../commands/book-room.command';
import { JwtAuthGuard } from './../../core/guards/auth.guard';
import { BookRoomDto } from './../dtos/book-room.dto';
import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from "@nestjs/common";
import { RoomBookBus } from "../bus/room-book.bus";
import { request } from 'http';
import { Result } from 'src/core/models/result.model';

@Controller("v1/rooms")
export class AgendaController {
    constructor(private readonly bus: RoomBookBus) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDto) {
        try{
            var command = new BookRoomCommand(request.user.document, model.roomId, model.date);
            await this.bus.Book(command);
        } catch(error) {
            throw new HttpException(
                new Result('Não foi possível reservar sua sala', false, null, error),
                HttpStatus.BAD_REQUEST
            )
        }
    }
}