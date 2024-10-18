// src/common/interceptors/transform.interceptor.ts

import { BaseResponse } from '@app/interfaces/response';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((respData: T) => {
        return {
          success: true,
          data: respData,
          statusCode: response.statusCode,
          message: 'Operation successful',
        };
      }),
      catchError(err => throwError(() => new BadGatewayException(err))),
    );
  }
}
