import { BookService } from '@modules/book/book.service';
import { UserService } from '@modules/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new HttpException(
          'Пользователь не авторизован',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          'Пользователь не авторизован',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      const bookId = +req.params.id;
      const userId = +user.id;

      const book = await this.bookService.getBookById(bookId);
      if (userId !== book.user.id) {
        throw new HttpException('У вас нет доступа', HttpStatus.FORBIDDEN);
      }

      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(
          'Пользователь не авторизован',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw error;
    }
  }
}
