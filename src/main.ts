import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as dotenv from 'dotenv';
import { PrismaSeederService } from './prisma/prisma-seeder.service';

async function bootstrap() {
  dotenv.config();
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const prismaSeeder = app.get(PrismaSeederService);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
    }),
  );

  await prismaSeeder.seed();
  await app.listen(port || 3000);
  Logger.log(`App success started on port: ${port || 3000}`);
}
bootstrap();
