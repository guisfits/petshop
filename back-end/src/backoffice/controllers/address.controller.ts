import { Address } from './../models/address.model';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from './../../core/validator.interceptor';
import { Controller, Post, Param, Body, UseInterceptors, HttpException } from '@nestjs/common';
import { Result } from 'src/core/result.model';
import { AddressService } from '../services/address.service';
import { AddressType } from '../enums/address-type.enum';

@Controller('v1/customers/:document/addresses')
export class AddressController {
    
    constructor(
        private readonly addressService: AddressService
    ) { }

    @Post('billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createBilling(@Param('document') customerDocument: string, @Body() body: Address) {
        try {
            const customerWithAddress = await this.addressService.create(customerDocument, body, AddressType.Billing);
            return new Result('Endereço de entrega salvo com sucesso', true, customerWithAddress.billingAddress, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível realizar seu cadastro', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post('shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createShipping(@Param('document') customerDocument: string, @Body() body: Address) {
        try {
            const customerWithAddress = await this.addressService.create(customerDocument, body, AddressType.Shipping);
            return new Result('Endereço de entrega salvo com sucesso', true, customerWithAddress.shippingAddress, null);
        }
        catch (err) {
            throw new HttpException(
                new Result('Não foi possível realizar seu cadastro', false, null, err),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
