import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


dotenv.config();

async function bootstrap() {

  const config = new DocumentBuilder()
    .setTitle('Books Library')
    .setDescription('The Books Library API description')
    .setVersion('1.0')
    .addTag('books')
    .build();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors(corsOptions);

  await app.listen(4000);
}
bootstrap();
