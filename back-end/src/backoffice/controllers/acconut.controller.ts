import { AuthService } from './../../core/services/auth.service';
import { Controller, Get, UseGuards, Post } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Controller("v1/accounts")
export class AccountController {
    constructor(private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard())
    findAll() {
        return [];
    }

    @Post()
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}  