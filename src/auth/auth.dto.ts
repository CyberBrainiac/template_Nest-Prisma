import { Exclude } from 'class-transformer';
import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, ValidateIf } from 'class-validator';

export enum TLogin {
  ID = 'id',
  EMAIL = 'email',
  PHONE = 'phone',
}

export class AuthDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  loginType: TLogin;

  @IsNotEmpty() //additional validation in custom AuthValidation pipe
  payload: string | number;
}

export class AuthResponceDto extends AuthDto {
  @Exclude()
  password: string;
}
