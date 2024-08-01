import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    Logger.error(
      `\n\rUnhandled HTTP exception, Catch by Global Handler\n\r${exception.message} ${exception.getStatus()}`,
      exception.stack,
    );

    response.status(status).json({
      type: 'Unhandled HTTP exception',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
