import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('API_PORT', 3000);
  const host = configService.get<string>('API_HOST');

  const config = new DocumentBuilder()
    .setTitle('RESTful API для управления книгами с аутентификацией')
    .setDescription('Документация по REST API')
    .setVersion('1.0.0')
    .addTag('Backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(
    `App started on ${host}${port}\nДокументация: ${host}${port}/swagger`,
  );
}
bootstrap();
