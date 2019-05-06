import { AddressType } from './../enums/address-type.enum';
import { Address } from './../models/address.model';
import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>,
        private readonly httpService: HttpService,
    ) { }

    async create(document: string, data: Address, type: AddressType): Promise<Customer> {
        let set: any;

        if (type == AddressType.Shipping) {
            set = { 
                $set: { shippingAddress: data } 
            }
        } 
        else {
            set = { 
                $set: { billingAddress: data } 
            }
        }

        return await this.model.findOneAndUpdate({ document }, set, { upsert: true });
    }

    getAddressbyZipCode(zipcode: string) {
        const url = `https://viacep.com.br/ws/${zipcode}/json/`;
        return this.httpService.get(url);
    }
}