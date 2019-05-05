import { ProductService } from './../services/product.service';
import { Controller, Get, HttpException, HttpStatus, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { Result } from 'src/core/models/result.model';
import { Product } from '../entities/product.entity';

@Controller("v1/products")
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    async get() {
        try {
            const products = await this.service.find();
            return new Result(null, true, products, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível listar os produtos", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.create(model);
            return new Result(null, true, model, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível criar o produto", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body() model: Product) {
        try {
            await this.service.update(id, model);
            return new Result(null, true, model, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível atualizar o produto", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.service.remove(id);
            return new Result(null, true, null, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível remover o produto", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}