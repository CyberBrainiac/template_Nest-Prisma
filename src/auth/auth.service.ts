import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto, TLogin } from './auth.dto';
import { Prisma } from '@prisma/client';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(data: AuthDto): Promise<Prisma.UserCreateInput> {
    // @ts-expect-error login type can be string and number, payload also can be string and number, type validation already done. If i wouldnt write massive switch and duplicate code i must disable TypeScript
    const user = await this.userService.user({ [data.loginType]: data.payload }, null);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== data.password) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = 'secret-token.tokenSecret';
    return { ...user, token };
  }
}
