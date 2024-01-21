import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;
const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DB_PORT: Joi.number().default(3306),
  DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
  DB_TYPE: Joi.string().valid('mysql', 'postgres'),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  LOG_OPEN: Joi.boolean(),
  LOG_LEVEL: Joi.string(),
});

export const getAppConfig = (): ConfigModuleOptions => ({
  isGlobal: true, // 配置是全局配置,
  envFilePath: [envFilePath, '.env'], // 指定环境变量文件
  validationSchema: schema, // 验证配置
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
});
