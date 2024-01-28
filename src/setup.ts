import { HttpAdapterHost } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { getServerConfig } from './shared';
import { appConfig } from './common/constants';
import {
  AllExceptionsFilter,
  // HttpExceptionFilterFilter,
} from './common/filters';

export const setupApp = async (app: INestApplication) => {
  const config = getServerConfig(); // 获取配置
  const { APP_PORT, APP_PREFIX } = appConfig;
  const port =
    typeof config[APP_PORT] === 'string' ? parseInt(config[APP_PORT]) : 3000; // 端口
  const prefix = config[APP_PREFIX] || ''; // 前缀
  const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix(prefix);
  // 弊端 -> 无法使用DI -> 无法访问userService
  // app.useGlobalFilters(new HttpExceptionFilterFilter(new Logger()));

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // 去除在类上不存在的字段
    }),
  );

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // helmet头部安全
  app.use(helmet());

  // rateLimit限流
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 300, // limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(port);
};
