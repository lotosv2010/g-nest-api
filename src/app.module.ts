import { Logger, Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getAppConfig } from './config';
import { getDBFullOptions } from './config';
import { UserModule } from './module/user/user.module';
import { LogModule } from './module/log/log.module';
import { RoleModule } from './module/role/role.module';
import { AuthModule } from './module/auth/auth.module';
import { MenuModule } from './module/menu/menu.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtGuard } from './common/guards';

@Global()
@Module({
  imports: [
    UserModule,
    LogModule,
    RoleModule,
    ConfigModule.forRoot(getAppConfig()),
    TypeOrmModule.forRoot(getDBFullOptions()),
    AuthModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger, // 提供全局 Logger
    // TODO 全局注册守卫的另一种方式
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
  ],
  exports: [Logger],
})
export class AppModule {}
