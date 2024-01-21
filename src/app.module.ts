import { Logger, Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { getAppConfig } from './config';
import { LogModule } from './module/log/log.module';
import { RoleModule } from './module/role/role.module';
import { getDBFullOptions } from './config';

@Global()
@Module({
  imports: [
    UserModule,
    LogModule,
    RoleModule,
    ConfigModule.forRoot(getAppConfig()),
    TypeOrmModule.forRoot(getDBFullOptions()),
  ],
  controllers: [AppController],
  providers: [AppService, Logger], // 提供全局 Logger
  exports: [Logger],
})
export class AppModule {}
