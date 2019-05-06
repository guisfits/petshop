import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from 'src/store/store.module';
import { TypeOrmModule } from  '@nestjs/typeorm';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      password: '@Senha123',
      database: 'Petshop',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true      
    }),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
