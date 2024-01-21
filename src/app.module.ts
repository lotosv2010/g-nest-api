import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { getAppConfig, getDbConfig } from './config';
import { LogModule } from './module/log/log.module';
import { RoleModule } from './module/role/role.module';

@Module({
  imports: [
    UserModule,
    LogModule,
    RoleModule,
    ConfigModule.forRoot(getAppConfig()),
    TypeOrmModule.forRootAsync(getDbConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
