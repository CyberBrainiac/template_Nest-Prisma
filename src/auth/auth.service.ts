import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { Prisma } from '@prisma/client';
import { OwnerService } from '@app/owner/owner.service';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private prisma: PrismaService,
  ) {}

  async signIn(data: AuthDto): Promise<Prisma.OwnerCreateInput | null> {
    const owner = this.prisma.owner.findFirst({
      where: { OR: [{ id: +data.payload }, { email: data.payload }, { phone: +data.payload }] },
    });
    return owner;
  }
}
