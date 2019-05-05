import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Result } from "../models/result.model";

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) { }

    intercept(context: ExecutionContext, call$: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        let hasRole = false;

        payload.roles.forEach((role) => {
            if(this.roles.includes(role))
                hasRole = true;
        });

        if(!hasRole) {
            throw new HttpException(
                new Result('Acesso não autorizado', false, null, null),
                HttpStatus.FORBIDDEN
            );
        }

        return call$.handle();
    }
}
