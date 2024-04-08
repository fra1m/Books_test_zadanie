import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from '@modules/book/book.module';

@Module({
  controllers: [],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => BookModule),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY') || 'SECRET',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
