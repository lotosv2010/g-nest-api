import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServerConfig } from './shared';
import { appConfig } from './common/constants';

async function bootstrap() {
  const config = getServerConfig(); // 获取配置
  const { APP_PORT, APP_PREFIX } = appConfig;
  const port =
    typeof config[APP_PORT] === 'string' ? parseInt(config[APP_PORT]) : 3000; // 端口
  const prefix = config[APP_PREFIX] || ''; // 前缀

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefix);
  await app.listen(port);
}
bootstrap();
