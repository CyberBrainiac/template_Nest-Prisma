import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto, TLogin } from './auth.dto';
import { Prisma } from '@prisma/client';
import { OwnerService } from '@app/owner/owner.service';

@Injectable()
export class AuthService {
  constructor(private ownerService: OwnerService) {}

  async signIn(data: AuthDto): Promise<Prisma.OwnerCreateInput> {
    // @ts-expect-error login type can be string and number, payload also can be string and number, type validation already done. If i wouldnt write massive switch and duplicate code i must disable TypeScript
    const owner = await this.ownerService.owner({ [data.loginType]: data.payload });

    if (!owner) {
      throw new NotFoundException('User not found');
    }

    if (owner.password !== data.password) {
      throw new UnauthorizedException('Invalid password');
    }

    return owner;
  }
}
