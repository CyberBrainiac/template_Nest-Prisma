import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthValidation } from '@app/pipes/auth-validation.pipe';
import { plainToClass } from 'class-transformer';
import { OwnerResponce } from '@app/owner/dto/owner.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async signIn(@Body(new AuthValidation()) data: AuthDto) {
    const owner = await this.authService.signIn(data);

    // This is example, how i can filter sensetive data from responce
    return plainToClass(OwnerResponce, owner);
  }
}
