import { UserEntity } from '@entities/User.entity';
import { AuthUserDto } from '@modules/auth/dto/auth-user.dto';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { UserService } from '@modules/user/user.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordCompare = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordCompare) {
      return user;
    }
    throw new UnauthorizedException('Неккоректный логин или пароль');
  }

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    console.log(candidate);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(
      userDto.password,
      +this.configService.get<string>('SALT_ROUNDS'),
    );

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const token = this.generateToken(user);
    return user;
  }
}
