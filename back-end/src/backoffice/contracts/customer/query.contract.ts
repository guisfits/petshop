import { Flunt } from '../../../core/utils/flunt';
import { Contract } from '../../../core/interfaces/contract.interface';
import { Injectable } from '@nestjs/common';
import { QueryDto } from 'src/backoffice/dtos/customers/query.dto';

@Injectable()
export class QueryContract implements Contract {
    errors: any[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();

        flunt.isLessThan(model.take, 25, 'Quantidade máxima de registros não pode ser maior que 25');
        flunt.isGreaterThan(model.skip, 0, 'Quantidade mínima de registros deve ser maior que 0');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
