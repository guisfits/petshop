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

    async createToken(document, roles: string[]) {
        const user: JwtPayload = { 
            document: document,
            roles: roles
        };

        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return payload;
        // return await this.accountService.findOnebyUsername(payload.document);
    }
}