import { AccountController } from './controllers/acconut.controller';
import { AccountService } from './services/account.service';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { AuthService } from './../core/services/auth.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './services/customer.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../core/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { PetController } from './controllers/pet.controller';
import { PetService } from './services/pet.service';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600
      }
    }),
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
    AccountController,
    AddressController,
    PetController,
    CustomerController
  ],
  providers: [
    AccountService,
    CustomerService,
    AddressService,
    PetService,
    AuthService,
    JwtStrategy
  ]
})
export class BackofficeModule {}
