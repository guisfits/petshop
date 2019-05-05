import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>
    ) { }

    async find(): Promise<Product[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Product> {
        return await this.repository.findOne(id);
    }
    
    async create(product: Product) {
        await this.repository.save(product);
    }

    async update(id: number, product: Product) {
        await this.repository.update(id, product);
    }

    async remove(id: number) {
        await this.repository.delete(id);
    }
}