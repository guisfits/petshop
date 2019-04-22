import { Address } from './../models/address.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async createBillingAddress(document: string, data: Address): Promise<Customer> {
        return await this.model.findOneAndUpdate(
            {
                document
            },
            {
                $set: {
                    billingAddress: data
                }
            },
            {
                upsert: true
            }
        );
    }
}