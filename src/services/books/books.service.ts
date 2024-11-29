import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { BookEntity } from 'src/database/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { paginate } from 'src/helpers/pagination.helper';
import { applyFilter } from 'src/helpers/filter.helper';
import { SearchBooksDto } from 'src/dto/search-book.dto';
import { BookRepository } from 'src/repository/book.repository';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private customReposity: BookRepository,

  ) { }

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const user = await this.usersRepository.findOneBy({
      id: createBookDto.userId,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const book = this.booksRepository.create({
      ...createBookDto,
      user,
    });

    return this.booksRepository.save(book);
  }

  async findOne(id: string): Promise<BookEntity> {
    const bookFound = await this.booksRepository.findOne({
      where: { id }
    })
    if (!bookFound) {
      throw new NotFoundException(`book with ID "${id}" not found`);
    }
    return bookFound
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const bookFound = await this.findOne(id)
    Object.assign(bookFound, updateBookDto);

    return await this.booksRepository.save(bookFound);
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {

    const queryBuilder = this.booksRepository.createQueryBuilder('book');
    return paginate(queryBuilder, page, limit);

  }


  async getBookByName(name: string): Promise<BookEntity[]> {
    const books = await this.customReposity.getAllBooksByName(name);
    const bookPlain = plainToInstance(BookEntity, books);
    return bookPlain;
  }

  async getBookByAuthor(author: string): Promise<BookEntity[]> {
    const books = await this.customReposity.getAllBooksByAuthor(author);
    console.log(books)
    const bookPlain = plainToInstance(BookEntity, books);
    return bookPlain;
  }
  async getBookByYear(year: number): Promise<BookEntity[]> {
    const books = await this.customReposity.getAllBooksByYear(year);
    const bookPlain = plainToInstance(BookEntity, books);
    return bookPlain;
  }
  async getBookByGenre(genre: string): Promise<BookEntity[]> {
    const books = await this.customReposity.getAllBooksByGenre(genre);
    const bookPlain = plainToInstance(BookEntity, books);
    return bookPlain;
  }


  async SearchFilterBook(filterType: SearchBooksDto): Promise<BookEntity[] | string> {
    if (filterType.author) return this.getBookByAuthor(filterType.author)
    if (filterType.year) return this.getBookByYear(filterType.year)
    if (filterType.genre) return this.getBookByGenre(filterType.genre)
  }


}
