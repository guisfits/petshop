import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 8})
    number: string;

    @Column('datetime')
    date: Date;

    @Column({ length: 11})
    customer: string;

    @OneToMany(() => OrderItem, x => x.order)
    items: OrderItem[];
}