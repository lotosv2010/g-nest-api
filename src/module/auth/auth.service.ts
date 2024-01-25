import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
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

    // 用户密码比对
    const isPasswordValid = await verify(user.password, signinUserDto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或者密码错误');
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

  async signup(signupUserDto: SigninUserDto) {
    const user = await this.usersService.find(signupUserDto.username);
    if (user) {
      throw new ForbiddenException('用户已存在');
    }
    return this.usersService.create(signupUserDto);
  }
}
