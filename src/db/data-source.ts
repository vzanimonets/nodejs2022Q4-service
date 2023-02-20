import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_BD_HOST,
  port: +process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DB,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/db/migrations/*js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
