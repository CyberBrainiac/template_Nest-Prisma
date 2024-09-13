import { Exclude, Expose } from 'class-transformer';

export class Owner {
  id: number;
  email: string;
  password: string;
  name?: string | null;
  phone: string;
}

export class OwnerResponce extends Owner {
  @Exclude()
  password: string;
  cat?: object;
}
