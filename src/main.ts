import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
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

  await app.listen(port);
  Logger.log(`App success started on port: ${port}`);
}
bootstrap();
