import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthValidation } from '@app/pipes/auth-validation.pipe';
import { plainToClass } from 'class-transformer';
import { UserResponceDto } from '@app/user/user.dto';
import { Public } from '@app/customDecorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body(new AuthValidation()) data: AuthDto) {
    const user = await this.authService.signIn(data);

    // This is example, how i can filter sensetive data from responce
    return plainToClass(UserResponceDto, user);
  }
}
