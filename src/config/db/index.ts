import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig, DEVELOPMENT } from 'src/common/constants';
import { getServerConfig } from 'src/shared';

const config = getServerConfig();

export const getDBBaseOptions = () => {
  const entities =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/**/*.entity.ts']
      : [__dirname + '/**/*.entity{.js,.ts}'];

  const logging =
    config[dbConfig.DB_LOGGING] === 'true' &&
    process.env.NODE_ENV === DEVELOPMENT;

  const baseOptions = {
    type: config[dbConfig.DB_TYPE],
    host: config[dbConfig.DB_HOST],
    port: config[dbConfig.DB_PORT],
    username: config[dbConfig.DB_USERNAME],
    password: config[dbConfig.DB_PASSWORD],
    database: config[dbConfig.DB_DATABASE],
    entities, // 实体
    logging, // 日志级别
  };
  return baseOptions;
};

const getDBOtherOptions = () => {
  const otherOptions = {
    synchronize: config[dbConfig.DB_SYNC], // synchronize字段代表是否自动将实体类同步到数据库
    retryDelay: config[dbConfig.DB_RETRYDELAY], // 重试连接数据库间隔
    retryAttempts: config[dbConfig.DB_RETRYATTEMPTS], // 重试连接数据库的次数
    autoLoadEntities: config[dbConfig.DB_AUTOLOADENTITIES], // 如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  };
  return otherOptions;
};

// 通过dotENV来解析不同的配置
export function getDBFullOptions() {
  return {
    ...getDBBaseOptions(),
    ...getDBOtherOptions(),
  } as unknown as TypeOrmModuleOptions;
}
