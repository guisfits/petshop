import { Address } from '../../models/address.model';
import { Flunt } from '../../../core/flunt';
import { Contract } from '../../../core/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
        flunt.hasMinLen(model.street, 3, 'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city,3, 'Cidade inválida');
        flunt.isFixedLen(model.state, 2, 'Estado inválido');
        flunt.hasMinLen(model.country, 3, 'País inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
