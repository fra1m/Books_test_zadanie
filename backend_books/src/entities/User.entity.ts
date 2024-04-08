import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from './Book.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@user.ru', description: 'Почта пользователя' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: 'pass123',
    description: 'Пароль пользователя',
    minLength: 4,
    maxLength: 16,
  })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    example: 'Антон',
    description: 'Имя пользователя',
  })
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => BookEntity, (book) => book.user, {
    cascade: true,
    eager: true,
  })
  books: BookEntity[];
}
