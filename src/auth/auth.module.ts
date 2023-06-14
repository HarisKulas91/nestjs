import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { EmployeeService } from '../employee/employee.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    EmployeeModule, 
    PassportModule, 
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, EmployeeService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}