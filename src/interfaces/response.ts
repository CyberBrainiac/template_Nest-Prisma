import { HttpStatus } from '@nestjs/common';

export class BaseResponse<T> {
  success: boolean;
  data: T;
  statusCode: HttpStatus;
}

export class ErrorResponse<T = null> extends BaseResponse<T> {
  message: string;
  metadata: ErrorMetadata;
}

class ErrorMetadata {
  timestamp: string;
  path: string;
  exceptionType: string;
  exceptionName?: string;
  errorCode?: string;
  stackTrace?: string;
}
