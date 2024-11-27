import { Module } from '@nestjs/common';
import { BooksService } from '../../services/books/books.service';
import { BooksController } from '../../controllers/books/books.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/database/entities/book.entity';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([BookEntity, UserEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
