import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.usersService.find(signinUserDto.username);
    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }

    return await this.jwtService.signAsync(
      {
        username: user.username,
        sub: user.id,
      },
      // 局部设置过期时间，通常在refreshToken时使用
      // {
      //   expiresIn: '1d',
      // },
    );
  }

  signup(signupUserDto: SigninUserDto) {
    return this.usersService.create(signupUserDto);
  }
}
