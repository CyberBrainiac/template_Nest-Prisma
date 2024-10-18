import { ErrorResponse } from '@app/interfaces/response';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse: ErrorResponse<null> = {
      success: false,
      data: null,
      message: exception.message,
      statusCode: status,
      metadata: {
        exceptionName: exception.name,
        exceptionType: 'HTTP exception',
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };
    response.status(status).json(errorResponse);
  }
}
