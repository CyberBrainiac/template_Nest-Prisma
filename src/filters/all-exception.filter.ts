//source: https://docs.nestjs.com/exception-filters
import { ErrorResponse } from '@app/interfaces/response';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import axios from 'axios';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    let httpStatus: number;
    let errorMessage: string;

    /**  Тимчасовий варіант
     *
     *   Переробити перевірку errorMessage та httpStatus
     *
     * */
    if (axios.isAxiosError(exception)) {
      errorMessage =
        exception.response?.data.message ?? exception.response?.statusText ?? 'AXIOS_ERROR';
      httpStatus =
        exception.status ?? exception.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof HttpException) {
      errorMessage = exception.message;
      httpStatus = exception.getStatus();
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (typeof exception === 'string') {
      errorMessage = exception;
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      errorMessage = 'Internal server error';
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody: ErrorResponse<null> = {
      success: false,
      data: null,
      message: errorMessage,
      statusCode: httpStatus,
      metadata: {
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        exceptionType: exception instanceof Error ? exception.constructor.name : 'UNKNOWN_ERROR',
        stackTrace:
          this.configService.get('NODE_ENV') === 'development'
            ? exception instanceof Error
              ? exception.stack
              : undefined
            : undefined,
      },
    };

    this.logger.error(
      `Unhandled Exception: ${errorMessage}`,
      exception instanceof Error ? exception.stack : undefined,
    );
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
