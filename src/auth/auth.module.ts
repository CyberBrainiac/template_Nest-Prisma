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
      secret: (() => {
        console.log(`${process.env.JWT_SECRET}`);

        return `${process.env.JWT_SECRET}`;
      })(),
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, HashService, JwtService],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {}
}
