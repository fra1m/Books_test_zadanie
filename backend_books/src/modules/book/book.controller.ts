import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from '@entities/Book.entity';
import { OwnerGuard } from '@modules/auth/owner.guard';

@ApiTags('CRUD Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Создание книги' })
  @ApiResponse({ status: 200, type: BookEntity })
  @UseGuards(JwtAuthGuard)
  @Post('')
  createBook(@Body() createBookDto: CreateBookDto, @Req() req: any) {
    const user = req.user;
    return this.bookService.createBook(createBookDto, +user.id);
  }

  @ApiOperation({ summary: 'Получение всех книг' })
  @ApiResponse({ status: 200, type: [BookEntity] })
  @Get('')
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      skipMissingProperties: true,
    }),
  )
  async getAllBooks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('author') author?: string,
    @Query('year') year?: string,
  ) {
    return this.bookService.getAllBooks(page, limit, author, year);
  }
  @ApiOperation({ summary: 'Получение книге по id' })
  @ApiResponse({ status: 200, type: BookEntity })
  @Get(':id')
  getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(id);
  }

  @ApiOperation({ summary: 'Обновление книге по Id (только владелец книги)' })
  @ApiResponse({ status: 200, type: BookEntity })
  @UseGuards(OwnerGuard)
  @Patch(':id')
  updateBookById(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.updateBookById(id, updateBookDto);
  }

  @ApiOperation({ summary: 'Удаление книги по Id (только владелец книги)' })
  @ApiResponse({ status: 200, type: BookEntity })
  @UseGuards(OwnerGuard)
  @Delete(':id')
  removeBookById(@Param('id') id: number) {
    return this.bookService.removeBookById(id);
  }
}
