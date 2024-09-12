import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post() async signIn(@Body() data: AuthDto) {
    const owner = await this.authService.signIn(data);

    if (!owner) {
      return null;
    }

    const { password, ...ownerWithoutPass } = owner;
    return ownerWithoutPass;
  }
}
