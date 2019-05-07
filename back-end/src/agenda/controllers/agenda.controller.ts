import { Controller, Post, Body } from "@nestjs/common";
import { RoomBookBus } from "../bus/room-book.bus";

@Controller("v1/rooms")
export class AgendaController {
    constructor(private readonly bus: RoomBookBus) {}

    @Post()
    async Book(@Body() body: any) {
        await this.bus.Book(body.customer, body.room);
    }
}