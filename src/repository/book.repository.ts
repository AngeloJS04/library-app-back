
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/database/entities/book.entity';
import { ILike, Like, Repository } from 'typeorm';

export class BookRepository {
    constructor(
        @InjectRepository(BookEntity) private bookRepository: Repository<BookEntity>,
    ){}

    async getAllBooksByName(name: string) {
        try {
          const book = await this.bookRepository.find({
            where: {
               title: ILike(`%${name}%`),
            },
            skip: 0,
            take: 5,
          });
    
          if (!book) throw new NotFoundException('Books not found');
          return book;
        } catch (error) {
          if (!error) throw new NotFoundException('Book not found');
        }
      }


      async getAllBooksByAuthor(author: string) {
        try {
          const book = await this.bookRepository.find({
            where: {
                author: Like(`${author}%`),
            },
            skip: 0,
            take: 5,
          });
    
          if (!book) throw new NotFoundException('Books not found');
          return book;
        } catch (error) {
          if (!error) throw new NotFoundException('Book not found');
        }
      }

      async getAllBooksByYear(year: number) {
        try {
          const book = await this.bookRepository.find({
            where: {
                year
            },
            skip: 0,
            take: 5,
          });
    
          if (!book) throw new NotFoundException('Books not found');
          return book;
        } catch (error) {
          if (!error) throw new NotFoundException('Book not found');
        }
      }
      async getAllBooksByGenre(genre: string) {
        try {
          const book = await this.bookRepository.find({
            where: {
                genre: Like(`${genre}%`),
            },
            skip: 0,
            take: 5,
          });
    
          if (!book) throw new NotFoundException('Books not found');
          return book;
        } catch (error) {
          if (!error) throw new NotFoundException('Book not found');
        }
      }

}