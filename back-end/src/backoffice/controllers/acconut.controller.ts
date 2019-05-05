import { JwtAuthGuard } from './../../core/guards/auth.guard';
import { ChangePasswordDto } from './../dtos/accounts/change-password.dto';
import { AccountService } from './../services/account.service';
import { AuthService } from './../../core/services/auth.service';
import { Controller, Post, Body, HttpStatus, HttpException, Req, UseGuards } from "@nestjs/common";
import { AuthenticateDto } from '../dtos/accounts/authenticate.dto';
import { Result } from 'src/core/models/result.model';
import { ResetPasswordDto } from '../dtos/accounts/reset-password.dto';
import { Guid } from 'guid-typescript';

@Controller("v1/accounts")
export class AccountController {
    constructor(
        private authService: AuthService,
        private accountService: AccountService
    ) { }

    @Post("authenticate")
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        if (!customer) {
            throw new HttpException(
                new Result('Usuário ou senha inválidos', false, null, null),
                HttpStatus.NOT_FOUND
            );
        }

        if(!customer.user.active) {
            throw new HttpException(
                new Result('Usuário inativo', false, null, null),
                HttpStatus.UNAUTHORIZED
            );
        }

        const token = await this.authService.createToken(customer.document, customer.user.roles);
        return new Result(null, true, token, null);
    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            const passowrd = Guid.create().toString().replace("-", '').substring(0, 8);
            await this.accountService.update(model.document, { passowrd: passowrd });
            // TODO: Enviar senha por e-mail
            return new Result('Uma nova senha foi enviada para seu E-mail', true, null, null);
        } catch (error) {  
            throw new HttpException(
                new Result('Não foi possível restaurar sua senha', false, null, error),
                HttpStatus.BAD_REQUEST
            );        
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso', true, null, null);
        } 
        catch (error) {  
            throw new HttpException(
                new Result('Não foi possível alterar sua senha', false, null, error),
                HttpStatus.BAD_REQUEST
            );        
        }
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        const token = await this.authService.createToken(request.user.document, request.user.roles);
        return new Result(null, true, token, null);
    }
}  