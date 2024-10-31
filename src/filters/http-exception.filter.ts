import { ErrorResponse } from '@app/interfaces/response';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Get the response from the exception
    const exceptionResponse = exception.getResponse() as any;
    const message =
      typeof exceptionResponse === 'object' ? exceptionResponse.message : exception.message;

    const errorResponse: ErrorResponse = {
      success: false,
      data: null,
      message: Array.isArray(message) ? message[0] : message,
      statusCode: status,
      metadata: {
        exceptionName: exception.name,
        exceptionType: 'HTTP_EXCEPTION',
        timestamp: new Date().toISOString(),
        path: request.url,
        errorCode: exceptionResponse.errorCode,
        stackTrace:
          this.configService.get('NODE_ENV') === 'development' ? exception.stack : undefined,
      },
    };

    this.logger.error(`HTTP Exception: ${exception.message}`, exception.stack);

    response.status(status).json(errorResponse);
  }
}
