import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EncryptModule } from '@app/encrypt/encrypt.module';
import { HashService } from '@app/encrypt/hash.service';

@Module({
  imports: [EncryptModule],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
