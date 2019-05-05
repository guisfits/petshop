import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Cookie } from "cookiejar";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    title: string;

    @Column('text')
    description: string;

    @Column('money')
    price: number;

    @Column('decimal')
    quantityOnHand: number;
}