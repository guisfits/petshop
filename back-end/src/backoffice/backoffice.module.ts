import { CustomerService } from './services/customer.service';
import { AccountService } from './services/account.service';
import { UserSchema } from './schemas/user.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema
      },
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  controllers: [
    CustomerController
  ],
  providers: [
    AccountService,
    CustomerService
  ]
})
export class BackofficeModule {}
