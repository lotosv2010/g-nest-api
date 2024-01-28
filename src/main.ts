import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 允许跨域
    cors: true,
  });
  setupApp(app);
}
bootstrap();
