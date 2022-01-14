import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app-logging';
import { Logger, NestApplicationOptions } from '@nestjs/common';
import { setupSwagger } from './api-docs.swagger';

async function bootstrap() {

  const logger = (process.env.NODE_ENV === 'production') ? WinstonModule.createLogger(winstonOptions) : new Logger('Bootstrap Logger');
  const nestAppOptions : NestApplicationOptions = {
    logger :  logger
  }

  const app = await NestFactory.create(AppModule, nestAppOptions);

  app.use(helmet());

  const serverConfig = config.get('server');
  const port = process.env.SERVER_PORT || serverConfig.port;

  logger.log(`Application is running in "${process.env.NODE_ENV}" mode`);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    setupSwagger(app);
  } else {

  }

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
