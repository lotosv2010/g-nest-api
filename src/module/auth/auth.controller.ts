import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signinUserDto: SigninUserDto) {
    const token = await this.authService.signin(signinUserDto);
    return {
      access_token: token,
    };
  }

  @Post('signup')
  signup(@Body() signupUserDto: SigninUserDto) {
    return this.authService.signup(signupUserDto);
  }
}
