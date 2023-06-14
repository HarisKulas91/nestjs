import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { EmployeeService } from './employee/employee.service';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
  let appController: AppController;

  let usr = {
    EmployeeId: 10,
    LastName: 'Kulas',
    FirstName: 'Haris',
    Title: 'Manager',
    ReportsTo: null,
    BirthDate: '1993-07-07T22:00:00.000Z',
    HireDate: '2022-07-07T22:00:00.000Z',
    Address: 'Hum',
    City: 'Sarajevo',
    State: null,
    Country: 'BiH',
    PostalCode: '71000',
    Phone: '1-212-456-7890',
    Fax: null,
    Email: 'haris.kulas@gmail.com',
    Password: '$2b$10$liU4hnANyvlNhDNoMB9i8uhVY.u6bVI/bRwZE6H7ubKgzOnKUeZEW'
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthService, EmployeeService, JwtService, PrismaService],
    }).useMocker((token) => {
      if (token === AuthService) {
        return {
          login: jest.fn().mockResolvedValue(usr),
        };
      }
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
