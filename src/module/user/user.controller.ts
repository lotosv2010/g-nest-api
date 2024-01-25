import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  LoggerService,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
// import { AuthGuard } from '@nestjs/passport';
import { AdminGuard, JwtGuard } from 'src/common/guards';

@Controller('user')
// 此处的守卫整个Controller都会执行
// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post()
  create(@Body(new CreateUserPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // !非常重要的知识点
  // 1. 装饰器的执行顺序，方法的装饰器如果有多个，则是从下往上执行
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // 2. 如果使用UseGuard传递多个守卫，则从前往后执行，如果前面的Guard没有通过，则后面的Guard不会执行
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseGuards(AdminGuard)
  findAll(@Query() queryUserDto: QueryUserDto) {
    return this.userService.findAll(queryUserDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Get('profile/:id')
  // @UseGuards(AuthGuard('jwt'))
  findProfileOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findProfileOne(+id);
  }
}
