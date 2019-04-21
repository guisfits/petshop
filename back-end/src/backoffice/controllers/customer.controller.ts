import { CreateCustomerContract } from './../contracts/customer.contract';
import { ValidatorInterceptor } from './../../core/validator.interceptor';
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from 'src/core/result.model';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Controller('v1/customers')
export class CustomerController {
    @Get()
    getAll() {
        return new Result(null, true, [], null);

    }

    @Get(':document')
    getById(@Param('document') document) {
        return new Result(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() body: CreateCustomerDto) {
        return new Result('Cliente criado com sucesso', true, body, null);
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result('Cliente alterado com sucesso', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente excluido com sucesso', true, null, null);
    }
}
