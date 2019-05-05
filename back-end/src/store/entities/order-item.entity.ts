import { Product } from './product.entity';
import { Order } from "./order.entity";
import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, x => x.items)
    order: Order;

    @ManyToOne(() => Product, p => p)
    product: Product;

    @Column('money')
    price: number;

    @Column('decimal')
    quantity: number;
}