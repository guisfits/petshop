import { Flunt } from '../../../core/utils/flunt';
import { Contract } from '../../../core/interfaces/contract.interface';
import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from 'src/backoffice/dtos/customers/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
    errors: any[];

    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
