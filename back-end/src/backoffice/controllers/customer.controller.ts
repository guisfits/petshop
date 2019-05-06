import { UpdateCustomerContract } from './../contracts/customer/update-customer.contract';
import { UpdateCustomerDto } from './../dtos/customers/update-customer.dto';
import { QueryContract } from './../contracts/customer/query.contract';
import { QueryDto } from '../dtos/customers/query.dto';
import { HttpStatus } from '@nestjs/common';
import { AccountService } from './../services/account.service';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { ValidatorInterceptor } from '../../core/interceptors/validator.interceptor';
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from 'src/core/models/result.model';
import { CreateCustomerDto } from '../dtos/customers/create-customer.dto';
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
            const user = new User(body.document, body.password, false, ['user']);
            const userCreated = await this.accountService.create(user);
            const customer = new Customer(body.name, body.document, body.email, null, null, null, null, userCreated);
            const customerCreated = await this.customerService.create(customer);

            return new Result(null, true, customerCreated, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível realizar seu cadastro', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() body: UpdateCustomerDto) {
        try {
           
            await this.customerService.update(document, body);
            return new Result('Cliente atualizado com sucesso', true, null, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível atualizar o cliente', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
