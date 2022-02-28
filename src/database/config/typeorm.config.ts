import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';
import { join } from 'path';
import { CustomLogger } from '../logger/typeorm.logger';

const dbConfig = config.get('db');
  
const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [join(__dirname, '..', '..', 'modules', '**', '*.entity.{js,ts}')],
  subscribers: [join(__dirname, '..', '..', 'modules', '**', '*.entity.subscriber.{js,ts}')],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  migrationsRun: dbConfig.migrationsRun,
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  cli: {
      migrationsDir: join('src', 'database' ,'migrations')
  },
  // logging: ["query", "error"],
  // logger: "file",
  // logger: new CustomLogger()
};

module.exports = typeOrmConfig;
