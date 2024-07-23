export class CreateCatDto {
  /** best approach */
  name: string;
  ownerId: number;
  age?: number;
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
