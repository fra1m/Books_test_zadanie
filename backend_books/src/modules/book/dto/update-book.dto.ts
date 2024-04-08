import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({
    example: 'Эта книга о приключениях Короля Артура',
    description: 'Краткое описание книги',
    minLength: 10,
    maxLength: 100,
  })
  @Length(10, 100, {
    message:
      'Описание книги долно быть не меньше 10 символов, но не больше 100',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  description?: string;

  @ApiProperty({
    example: '1999-2001',
    description: 'Год издания',
    minLength: 4,
    maxLength: 9,
  })
  @Length(4, 9, {
    message: 'Год издание должна быть минимум от 4 до 9 символов',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  year?: string;
}
