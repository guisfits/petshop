import { Product } from './../entities/product.entity';
import { ProductService } from './../services/product.service';
import { OrderItemService } from './../services/order-item.service';
import { OrderService } from './../services/order.service';
import { Controller, Get, Param, HttpStatus, HttpException, Post, Body } from "@nestjs/common";
import { Result } from 'src/core/result.model';
import { OrderItemDto } from '../dtos/order-item.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Controller("v1/orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService :OrderItemService,
        private readonly productService: ProductService
    ) { }

    @Get(":order")
    async getByNumber(@Param("order") orderNumber: string) {
        try {
            const orders = await this.orderService.getByNumber(orderNumber);
            return new Result(null, true, orders, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível listar os pedidos", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get(":customer")
    async getByCustomer(@Param("customer") customer: string) {
        try {
            const order = await this.orderService.getByCustomer(customer);
            return new Result(null, true, order, null);
        } catch(error) {
            throw new HttpException(
                new Result("Não foi possível listar os pedidos", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '43731221802',
            order.date = new Date();
            order.number = '1B2F4F2A',
            order.items = [],
            await this.orderService.post(order);

            for(const item of model) {
                let product = await this.productService.findById(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            }

            return new Result(null, true, model, null);
        } 
        catch(error) {
            throw new HttpException(
                new Result("Não foi possível criar o pedido", false, null, error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}