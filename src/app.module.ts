import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app-logging';
import * as typeOrmConfig from './database/config/typeorm.config';
import { BullModule } from '@nestjs/bull';
import * as redisStore from 'cache-manager-redis-store';
import config from 'config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SharedModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonOptions),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || config.get('redis').host,
      port: process.env.REDIS_PORT || config.get('redis').port,
      ttl: process.env.REDIS_TTL || config.get('redis').ttl,
      max: process.env.REDIS_MAX || config.get('redis').max
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || config.get('redis').host,
        port: process.env.REDIS_PORT || config.get('redis').port,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
