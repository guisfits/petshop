import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { AccountService } from './../../backoffice/services/account.service';
import { JwtService } from "@nestjs/jwt"
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) {}

    async createToken() {
        const user: JwtPayload = { username: 'test@email.com'};
        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn: 3600,
            accessToken
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.accountService.findOnebyUsername(payload.username);
    }
}