import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaSeederService } from './prisma-seeder.service';
import { EncryptModule } from '@app/encrypt/encrypt.module';
import { HashService } from '@app/encrypt/hash.service';

@Global()
@Module({
  imports: [EncryptModule],
  providers: [PrismaService, PrismaSeederService, HashService],
  exports: [PrismaService, PrismaSeederService],
})
export class PrismaModule {}
