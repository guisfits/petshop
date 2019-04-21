import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "./contract";
import { Result } from "./result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) { }

    intercept(context: ExecutionContext, call$: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result('Ops, algo saiu errado', false, null, this.contract.errors),
                HttpStatus.BAD_REQUEST
            );
        }

        return call$.handle();
    }

}
