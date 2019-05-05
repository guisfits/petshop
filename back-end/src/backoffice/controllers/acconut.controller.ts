import { JwtAuthGuard } from './../../core/guards/auth.guard';
import { AuthService } from './../../core/services/auth.service';
import { Controller, Get, UseGuards, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { RoleInterceptor } from 'src/core/interceptors/role.interceptor';

@Controller("v1/accounts")
export class AccountController {
    constructor(private authService: AuthService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['admin']))
    findAll(@Req() request) {
        console.log(request.user);
        return [];
    }

    @Post()
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}  