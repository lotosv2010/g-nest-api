import { Controller, Get, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Body() body: Record<string, any>,
    @Headers() headers: Record<string, any>,
  ): string {
    console.log(body, headers);
    return this.appService.getHello();
  }
}
