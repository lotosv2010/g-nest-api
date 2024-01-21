import { DataSource, DataSourceOptions } from 'typeorm';
import { getDBBaseOptions } from 'src/config';

export default new DataSource({
  ...getDBBaseOptions(),
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
