import { Module } from '@nestjs/common';
import { BooksService } from '../../services/books/books.service';
import { BooksController } from '../../controllers/books/books.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/database/entities/book.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { BookRepository } from 'src/repository/book.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([BookEntity, UserEntity])],
  controllers: [BooksController],
  providers: [BooksService, JwtService, BookRepository],
})
export class BooksModule {}
