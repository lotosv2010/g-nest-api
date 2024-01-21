import { utilities, WinstonModuleAsyncOptions } from 'nest-winston';
import { transports, format } from 'winston';
import { ConfigService } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { logConfig } from 'src/common/constants';

const { combine, timestamp } = format;

export const getLogConfig = () => {
  const options = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const logOn = configService.get<boolean>(logConfig.LOG_OPEN);
      const ts: any[] = [new transports.Console()];
      if (logOn) {
        const transport = new transports.DailyRotateFile({
          level: configService.get<string>(logConfig.LOG_LEVEL),
          dirname: 'logs',
          filename: 'GNA-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: combine(timestamp(), utilities.format.nestLike()),
        });
        ts.push(transport);
      }
      return {
        transports: ts,
        format: combine(timestamp(), utilities.format.nestLike()),
      };
    },
  };
  return options as WinstonModuleAsyncOptions;
};
