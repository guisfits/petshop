import { Address } from './../models/address.model';
import { CreateAddressContract } from './../contracts/customer/create-address.contract';
import { HttpStatus } from '@nestjs/common';
import { AccountService } from './../services/account.service';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { ValidatorInterceptor } from './../../core/validator.interceptor';
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from 'src/core/result.model';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
    ) { }

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
    async create(@Body() body: CreateCustomerDto) {
        try {
            const userCreated = await this.accountService.create(
                new User(body.document, body.password, true)
            );
            const customer = await this.customerService.create(
                new Customer(body.name, body.document, body.email, null, null, null, null, userCreated)
            );

            return new Result('Cliente criado com sucesso', true, customer, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível realizar seu cadastro', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post(':document/billing-address')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createBillingAddress(@Param('document') customerDocument: string, @Body() body: Address) {
        try {
            const customerWithAddress = await this.customerService.createBillingAddress(customerDocument, body);
            return new Result('Endereço de entrega salvo com sucesso', true, customerWithAddress.billingAddress, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível realizar seu cadastro', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
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
