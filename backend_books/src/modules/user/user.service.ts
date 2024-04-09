import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    return await this.userRepository.save(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        'Пользователь не зарегестрирован',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
