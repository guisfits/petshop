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
        const user: JwtPayload = { 
            email: 'user@email.com',
            document: "12345678900",
            image: "assets/image/user.png",
            roles: ['admin']
        };

        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn: 3600,
            accessToken
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return payload;
        // return await this.accountService.findOnebyUsername(payload.document);
    }
}