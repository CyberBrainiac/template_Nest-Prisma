export class CreateCatDto {
  /** best approach */
  name: string;
  email: string;
  age: number;
  breed: string;
}

export interface ICreateCatDto {
  name: string;
  email: string;
  age: number;
  breed: string;
}
