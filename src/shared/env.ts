import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

// 通过环境变量读取不同的.env文件
export const getEnv = (env: string): Record<string, string> => {
  if (existsSync(env)) {
    return parse(readFileSync(env));
  }
};

export const getServerConfig = () => {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  return { ...defaultConfig, ...envConfig };
};
