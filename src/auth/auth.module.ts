import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { EncryptModule } from '@app/encrypt/encrypt.module';
import { HashService } from '@app/encrypt/hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    EncryptModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, HashService, JwtService],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {}
}
