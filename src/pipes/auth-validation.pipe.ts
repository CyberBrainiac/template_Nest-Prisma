import { AuthDto } from '@app/auth/auth.dto';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isEmail, isInt, isNotEmpty, isPhoneNumber } from 'class-validator';

@Injectable()
export class AuthValidation implements PipeTransform {
  transform(value: AuthDto, metadata: ArgumentMetadata) {
    let isValid = false;

    switch (value.loginType) {
      case 'id':
        isValid = isNotEmpty(value.payload) && isInt(value.payload);
        if (!isValid) {
          throw new BadRequestException('payload must be an integer id');
        }
        return value;

      case 'email':
        isValid = isNotEmpty(value.payload) && isEmail(value.payload);
        if (!isValid) {
          throw new BadRequestException('payload must be a valid email');
        }
        return value;

      case 'phone':
        if (typeof value.payload === 'number') {
          throw new BadRequestException('payload must be a string');
        }
        isValid = isNotEmpty(value.payload) && isPhoneNumber(value.payload);
        if (!isValid) {
          throw new BadRequestException('payload must be a valid phone number');
        }
        return value;

      default:
        throw new BadRequestException('unexpected value');
    }
  }
}
