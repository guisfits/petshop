import { CreatePetConstract } from '../contracts/pet/create-pet.contract';
import { HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from './../../core/validator.interceptor';
import { Controller, Post, Put, Param, Body, UseInterceptors, HttpException } from '@nestjs/common';
import { Result } from 'src/core/result.model';
import { Pet } from '../models/pet.model';
import { PetService } from '../services/pet.service';

@Controller('v1/customers/:document/pets')
export class PetController {
    
    constructor(
        private readonly petService: PetService
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreatePetConstract()))
    async createPet(@Param("document") document, @Body() model: Pet) {
        try {
            await this.petService.create(document, model);
            return new Result(null, true, model, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível criar seu pet", false, null, error), 
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Put(':id')
    async updatePet(@Param('document') document, @Param("id") id, @Body() model) {
        try {
            await this.petService.update(document, id, model);
            return new Result(null, true, model, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível atualizar seu pet", false, null, error), 
                HttpStatus.BAD_REQUEST
            );
        }    
    }
}
