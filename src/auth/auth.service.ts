import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto, TLogin } from './auth.dto';
import { UserService } from '@app/user/user.service';
import { HashService } from '@app/encrypt/hash.service';
import { UserResponceDto } from '@app/user/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: AuthDto): Promise<UserResponceDto> {
    const user = await this.userService.user(
      // @ts-expect-error login type can be string and number, payload also can be string and number, type validation already done. If i wouldnt write massive switch and duplicate code i must disable TypeScript
      { [data.loginType]: data.payload },
      null /** don't include cats */,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!this.hash.verify(data.password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    const jwtPayload = { id: user.id, email: user.email };
    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { ...user, token: jwtToken };
  }
}
