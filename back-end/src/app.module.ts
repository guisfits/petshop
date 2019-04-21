import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BackofficeModule,
    MongooseModule.forRoot('mongodb://localhost:27017')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
