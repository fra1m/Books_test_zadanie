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
    example: ' ',
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
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    example: '1999',
    description: 'Год издания',
  })
  @Column({ nullable: false })
  year: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идификатор автора',
  })
  @ManyToOne(() => UserEntity, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity;
}
