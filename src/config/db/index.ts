import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { dbConfig, DEVELOPMENT } from 'src/common/constants';
// import { Log } from 'src/module/log/entities/log.entity';
// import { Role } from 'src/module/role/entities/role.entity';
// import { Profile } from 'src/module/profile/entities/profile.entity';
// import { User } from 'src/module/user/entities/user.entity';

const entities =
  process.env.NODE_ENV === 'test'
    ? [__dirname + '/**/*.entity.ts']
    : [__dirname + '/**/*.entity{.js,.ts}'];

export const getDbConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const logging =
      configService.get<string>(dbConfig.DB_LOGGING) === 'true' &&
      process.env.NODE_ENV === DEVELOPMENT;
    const config = {
      type: configService.get<string>(dbConfig.DB_TYPE),
      host: configService.get<string>(dbConfig.DB_HOST),
      port: configService.get<number>(dbConfig.DB_PORT),
      username: configService.get<string>(dbConfig.DB_USERNAME),
      password: configService.get<string>(dbConfig.DB_PASSWORD),
      database: configService.get<string>(dbConfig.DB_DATABASE),
      entities, // [User, Profile, Log, Role], // 实体
      synchronize: configService.get<boolean>(dbConfig.DB_SYNC), // synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: configService.get<number>(dbConfig.DB_RETRYDELAY), // 重试连接数据库间隔
      retryAttempts: configService.get<number>(dbConfig.DB_RETRYATTEMPTS), // 重试连接数据库的次数
      autoLoadEntities: configService.get<boolean>(
        dbConfig.DB_AUTOLOADENTITIES,
      ), // 如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      logging, // 日志级别
    } as TypeOrmModuleOptions;
    return config;
  },
});
