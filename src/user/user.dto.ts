import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword({ minLength: 10, minSymbols: 2, minUppercase: 2, minNumbers: 2 })
  @IsString() //for develop purpose
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  @IsString() //for develop purpose
  phone: string;
}

export class UserDto extends CreateUserDto {
  id: number;
}

export class UserResponceDto extends UserDto {
  @Exclude()
  password: string;
  cat?: object;
}
