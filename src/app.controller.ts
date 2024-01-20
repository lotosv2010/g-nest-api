import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getAppPrefix(): string {
    const prefix = this.configService.get('APP_PREFIX') || '';
    return `Please Visit ${prefix}`;
  }
}
