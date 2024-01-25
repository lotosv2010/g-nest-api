import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { getServerConfig } from './shared';
import { appConfig } from './common/constants';
import {
  AllExceptionsFilter,
  // HttpExceptionFilterFilter,
} from './common/filters';
import { ValidationPipe } from '@nestjs/common';
// import { Logger } from '@nestjs/common';

async function bootstrap() {
  const config = getServerConfig(); // 获取配置
  const { APP_PORT, APP_PREFIX } = appConfig;
  const port =
    typeof config[APP_PORT] === 'string' ? parseInt(config[APP_PORT]) : 3000; // 端口
  const prefix = config[APP_PREFIX] || ''; // 前缀
  const app = await NestFactory.create(AppModule, {
    // 允许跨域
    cors: true,
  });
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
  await app.listen(port);
}
bootstrap();
