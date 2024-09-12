import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OwnerModule } from '@app/owner/owner.module';
import { OwnerService } from '@app/owner/owner.service';

@Module({
  imports: [OwnerModule],
  controllers: [AuthController],
  providers: [AuthService, OwnerService],
})
export class AuthModule {}
