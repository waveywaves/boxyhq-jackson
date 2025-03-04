require('reflect-metadata');
import { DataSource, DatabaseType, DataSourceOptions } from 'typeorm';
import * as mssql from './src/db/sql/mssql';

const type =
  process.env.DB_ENGINE === 'planetscale'
    ? 'mysql'
    : <DatabaseType>process.env.DB_TYPE || <DatabaseType>'postgres';

const entitiesDir =
  process.env.DB_ENGINE === 'planetscale' ? 'planetscale' : type === 'mssql' ? 'sql/mssql' : 'sql';
const migrationsDir = process.env.DB_ENGINE === 'planetscale' ? 'planetscale' : type;

let ssl;
if (process.env.DB_SSL === 'true') {
  ssl = {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
  };
}

const url = process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

let AppDataSource: DataSource;

const baseOpts = {
  type,
  synchronize: false,
  migrationsTableName: '_jackson_migrations',
  logging: 'all',
  entities: [`src/db/${entitiesDir}/entity/**/*.ts`],
  migrations: [`migration/${migrationsDir}/**/*.ts`],
};

if (type === 'mssql') {
  const mssqlOpts = mssql.parseURL(url);
  AppDataSource = new DataSource(<DataSourceOptions>{
    host: mssqlOpts.host,
    port: mssqlOpts.port,
    database: mssqlOpts.database,
    username: mssqlOpts.username,
    password: mssqlOpts.password,
    options: mssqlOpts.options,
    ...baseOpts,
  });
} else {
  AppDataSource = new DataSource(<DataSourceOptions>{
    url: process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
    ssl,
    ...baseOpts,
  });
}

export default AppDataSource;
