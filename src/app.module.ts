import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSourceOptions } from './database';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSourceOptions),
    AuthModule,
    BooksModule
  ],
  // controllers: [AppController, AuthController],
  // providers: [AppService],
})
export class AppModule { }
