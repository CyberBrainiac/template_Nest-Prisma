import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, ValidateIf } from 'class-validator';

export enum TLogin {
  ID = 'id',
  EMAIL = 'email',
  PHONE = 'phone',
}

export class AuthDto {
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 10, minSymbols: 2, minUppercase: 2, minNumbers: 2 })
  password: string;

  @IsNotEmpty()
  loginType: TLogin;

  @ValidateIf(o => o.login === TLogin.ID)
  @IsInt()
  @IsNotEmpty()
  @ValidateIf(o => o.login === TLogin.EMAIL)
  @IsEmail()
  @IsNotEmpty()
  @ValidateIf(o => o.login === TLogin.PHONE)
  @IsMobilePhone()
  @IsNotEmpty()
  payload: string;
}
