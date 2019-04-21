import { CreateCustomerDto } from './../dtos/create-customer.dto';
import { Flunt } from './../../core/flunt';
import { Contract } from './../../core/contract';
import { Customer } from '../models/customer.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];

    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMaxLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isFixedLen(model.document, 11, 'CPF inválido');
        flunt.hasMinLen(model.document, 6, 'Senha inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
