import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Приключения Короля Артура',
    description: 'Название книги',
  })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    example: 'Антон',
    description: 'Автор книги',
  })
  @Column({ nullable: false })
  author: string;

  @ApiProperty({
    example: 'Эта книга о приключениях Короля Артура',
    description: 'Краткое описание книги',
    minLength: 10,
    maxLength: 100,
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    example: '1999-2001',
    description: 'Год издания',
    minLength: 4,
    maxLength: 9,
  })
  @Column({ nullable: false })
  year: string;

  @ManyToOne(() => UserEntity, (user) => user.books)
  user: UserEntity;
}
