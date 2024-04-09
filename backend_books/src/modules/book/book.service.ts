import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from '@entities/Book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private UserService: UserService,
  ) {}

  async createBook(createBookDto: CreateBookDto, userId: number) {
    const user = await this.UserService.getUserById(userId);
    const book = await this.bookRepository.save({
      ...createBookDto,
    });
    book.user = user;
    return await this.bookRepository.save(book);
  }

  async getAllBooks(
    page?: number,
    limit?: number,
    author?: string,
    year?: string,
  ) {
    const queryBuilder = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.user', 'user')
      .orderBy('book.id', 'ASC');

    if (author) {
      queryBuilder.where('book.author = :author', { author });
    }
    if (year) {
      queryBuilder.andWhere('book.year = :year', { year });
    }

    const totalCount = await queryBuilder.getCount();
    const offset = (page - 1) * limit;

    if (offset < 0) {
      throw new HttpException('Книги не найдена', HttpStatus.BAD_REQUEST);
    }

    if (offset >= totalCount) {
      const lastPageOffset = Math.max(
        0,
        Math.floor((totalCount - 1) / limit) * limit,
      );

      const books = await queryBuilder
        .skip(lastPageOffset)
        .take(limit)
        .getMany();

      return books;
    }

    const books = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    if (books.length === 0) {
      console.log(books);

      throw new HttpException('Книги не найдена', HttpStatus.NOT_FOUND);
    }
    return books;
  }

  async getBookById(id: number) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.user', 'user')
      .where('book.id = :id', { id })
      .getOne();

    if (!book) {
      throw new HttpException('Книга не найдена', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async updateBookById(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.getBookById(id);

    Object.assign(book, updateBookDto);
    const updatedBook = await this.bookRepository.save(book);

    return updatedBook;
  }

  async removeBookById(id: number) {
    const book = await this.getBookById(id);

    if (!book) {
      throw new HttpException('Книга не найдена', HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.delete(id);

    return `Книга успешно удалена`;
  }
}
