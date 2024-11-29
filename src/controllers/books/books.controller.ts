import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BooksService } from '../../services/books/books.service';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBadRequestResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiResponse({
    description: 'Book Created',
    type: CreateBookDto,
    status: 201,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: [CreateBookDto],
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.booksService.findAll(page, limit);
  }
  @Get('/getBy')
  async getBooks(@Query('author') author?: string, @Query('year') year?: number, @Query('genre') genre?: string) {
    return this.booksService.SearchFilterBook({ author, year, genre });
  }

  @Get(`/search/name/:name`)
  async GetBookByName(@Param('name') name: string) {
    return this.booksService.getBookByName(name)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }


}
