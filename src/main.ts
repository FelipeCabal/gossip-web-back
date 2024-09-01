import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './config/constants/cors';
import * as morgan from 'morgan';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  app.use(morgan(configService.get('ENVIRONMENT', 'combined')));
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
