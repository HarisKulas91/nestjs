import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsUniqueConstraint } from '../common/validators/unique.validator';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, IsUniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class EmployeeModule {}