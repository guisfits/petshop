import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomerLogger } from './core/services/customer-logger.service';
import * as compression from "compression"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomerLogger(),
  });

  app.use(compression());

  // Open API
  const options = new DocumentBuilder()
    .setTitle("Petshop API")
    .setDescription("API nestjs")
    .setVersion("0.0.1")
    .addTag('petshop')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
