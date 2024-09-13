import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCatDto {
  // best approach - class
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(40)
  age?: number;

  @IsOptional()
  @IsString()
  breed?: string;
}

/*
export interface ICreateCatDto {
  name: string;
  email: string;
  age?: number;
  breed?: string;
}
*/
