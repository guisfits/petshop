import { Pet } from "src/backoffice/models/pet.model";
import { Contract } from "src/core/interfaces/contract.interface";
import { Flunt } from "src/core/utils/flunt";

export class CreatePetConstract implements Contract {
    errors: any[];

    validate(model: Pet): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, 'Nome inválido');
        flunt.hasMinLen(model.gender, 3, 'Gênero inválido');
        flunt.hasMinLen(model.kind, 3, 'Tipo inválido');
        flunt.hasMinLen(model.brand, 3, 'Raça inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}