import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';
import { UserEntity } from '@entities/User.entity';
import { AuthUserDto } from '@modules/auth/dto/auth-user.dto';

class TokenResponse {
  @ApiProperty({
    example: 'Закодированный JWT токен',
    description: 'JWT токен',
  })
  token: string;
}

@ApiTags('Users authorization')
@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @Post('/login')
  userAuth(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('/registration')
  userRegistration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
