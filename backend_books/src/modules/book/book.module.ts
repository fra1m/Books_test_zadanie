import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '@entities/Book.entity';
import { AuthModule } from '@modules/auth/auth.module';
import { UserService } from '@modules/user/user.service';
import { UserModule } from '@modules/user/user.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    TypeOrmModule.forFeature([BookEntity]), // Регистрируем BookEntity в TypeOrmModule
    forwardRef(() => AuthModule),
    UserModule,
  ],
})
export class BookModule {}
