import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Update with your Prisma service path
import { HashService } from '@app/encrypt/hash.service';

@Injectable()
export class PrismaSeederService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async seed() {
    const hashedPassword = await this.hashService.password('defaultPassword');

    const defaultUser = await this.prisma.user.upsert({
      where: { email: 'default@example.com' },
      update: {},
      create: {
        email: 'default@example.com',
        password: hashedPassword,
        name: 'Default User',
        phone: '+1234567890',
      },
    });

    Logger.log('Default user created');
  }
}
