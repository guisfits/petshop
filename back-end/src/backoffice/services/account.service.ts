import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountService {
    constructor(@InjectModel('User') private readonly model: Model<User>) { }

    async create(data: User) {
        const user = new this.model(data);
        return await user.save();
    }

    async findOnebyUsername(username: string) {
        return new User(username, "12345678900", true);
    }
}