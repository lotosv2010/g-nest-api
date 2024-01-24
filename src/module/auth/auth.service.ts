import { Injectable } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  signin(signinUserDto: SigninUserDto) {
    return this.usersService.findAll(signinUserDto as any);
  }

  signup(signupUserDto: SigninUserDto) {
    return this.usersService.create(signupUserDto);
  }
}
