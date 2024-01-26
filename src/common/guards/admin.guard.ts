import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';

@Injectable()
// 常见的错误：在使用AdminGuard未导入(在User模块中exports)UserModule
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const request = context.switchToHttp().getRequest();
    // console.log(request.query, request.user);
    const { username } = request.user;
    // 2. 获取请求中的用户信息进行逻辑上的判断 -> 角色判断
    const user = await this.userService.find(username);
    // console.log(request.query, request.user, user);
    // 普通用户
    if (user && user.roles.filter((r) => r.id === 2).length > 0) {
      return true;
    }
    // 管理员
    if (user && user.roles.filter((r) => r.id === 1).length > 0) {
      return true;
    }
    return false;
  }
}
