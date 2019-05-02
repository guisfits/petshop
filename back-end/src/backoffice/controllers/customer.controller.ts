import { QueryContract } from './../contracts/customer/query.contract';
import { QueryDto } from './../dtos/query.dto';
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
        private readonly customerService: CustomerService,
    ) { }

    @Get()
    async findAll() {
        try {
            const customers = await this.customerService.findAll();
            return new Result(null, true, customers, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível listar os clientes', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get(':document')
    async findByDocument(@Param('document') document) {
        try {
            const customer = await this.customerService.findByDocument(document);
            return new Result(null, true, customer, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível listar os clientes', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        try {
            const customer = await this.customerService.query(model);
            return new Result(null, true, customer, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível listar os clientes', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
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
}
