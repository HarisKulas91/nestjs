import { Module, Global, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { PrismaService } from './prisma.service';
import * as redisStore from 'cache-manager-redis-store';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { TrackModule } from './track/track.module';
import { env } from 'process';

@Global()
@Module({
  imports: [CustomerModule, EmployeeModule, AuthModule, TrackModule,
    CacheModule.register({
      // @ts-ignore
      store: redisStore,
      isGlobal: true,
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      ttl: 5000
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
