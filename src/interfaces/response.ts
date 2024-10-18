import { HttpStatus } from '@nestjs/common';

export class BaseResponse<T> {
  success: boolean;
  data: T;
  statusCode: HttpStatus;
  message?: string;
}

export class ErrorResponse<T> extends BaseResponse<T> {
  metadata: ResponseMetadata;
}

class ResponseMetadata {
  timestamp: string;
  path: string;
  exceptionType: string;
  exceptionName: string;
}
