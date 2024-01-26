import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { RoleModule } from '../role/role.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
