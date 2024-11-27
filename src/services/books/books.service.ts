import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { BookEntity } from 'src/database/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
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
    return this.paginate(queryBuilder, page, limit);

  }


  async findBooks(filters: { author?: string; year?: number; genre?: string }, page: number = 1, limit: number = 10): Promise<any> {
    const queryBuilder = this.booksRepository.createQueryBuilder('book');

    for (const [filterType, value] of Object.entries(filters)) {
      if (value) {
        await this.applyFilter(queryBuilder, filterType, value);
      }
    }

    return this.paginate(queryBuilder, page, limit);
  }

  private async paginate(queryBuilder, page: number = 1, limit: number = 10) {
    const take = limit;
    const skip = (page - 1) * take;

    queryBuilder.take(take).skip(skip);

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    return {
      data,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pageSize: take,
      },
    };
  }

  async applyFilter(queryBuilder, filterType: string, value: any) {
    switch (filterType) {
      case 'author':
        return queryBuilder.andWhere('book.author LIKE :author', { author: `%${value}%` });
      case 'year':
        return queryBuilder.andWhere('book.year = :year', { year: value });
      case 'genre':
        return queryBuilder.andWhere('book.genre LIKE :genre', { genre: `%${value}%` });
      default:
        return queryBuilder;
    }
  }


}
