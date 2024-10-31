import { BaseResponse } from '@app/interfaces/response';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseResponseInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((respData: T) => {
        return {
          success: true,
          data: respData,
          statusCode: response.statusCode,
        };
      }),
    );
  }
}
