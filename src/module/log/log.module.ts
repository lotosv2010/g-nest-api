import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { Log } from './entities/log.entity';
import { getLogConfig } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Log]),
    WinstonModule.forRootAsync(getLogConfig()),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
