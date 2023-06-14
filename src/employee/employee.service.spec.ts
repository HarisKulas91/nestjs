import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import {
  MockContext,
  Context,
  createMockContext,
} from '../../test/mocks/prisma.mock';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-emoloyee.dto';

describe('CustomerService', () => {
  let service: EmployeeService;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return ctx.prisma;
        }
      })
      .compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create employee', async () => { 
    const result = {
        EmployeeId: 1,
        LastName: "Kulas",
        FirstName: "Haris",
        Title: "Manager",
        BirthDate: "1993-07-07T22:00:00.000Z",
        HireDate: "2022-07-07T22:00:00.000Z",
        Address: "Hum",
        City: "Sarajevo",
        Country: "BiH",
        PostalCode: "71000",
        Phone: "1-212-456-7890",
        Email: "haris.kulas1@gmail1.com",
        Password: "$2b$10$dbFh1Pt/x4W6vBpD5RY13OhmwKIZQdwomvIHjFK5M4hC5Ln9yQJO."
    };
    mockCtx.prisma.employee.create.mockResolvedValue(result as any);
    const createEmployeeDto: CreateEmployeeDto = {
        Password: "testiramasdA!",
        FirstName: "Haris",
        LastName: "Kulas",
        Email: "haris.kulas1@gmail1.com",
        Title: "Mr",
        City: "Sarajevo",
        Country: "BiH",
        PostalCode: "71000",
        Phone: "1-212-456-7890",
        HireDate: "2022-07-08 00:00:00",
        Address: "Hum",
        BirthDate: "1993-07-08 00:00:00"
      };

    await expect(service.create(createEmployeeDto)).resolves.toEqual(result);
  });

  it('should get employee', async () => { 
    const result = {
        EmployeeId: 1,
        LastName: "Kulas",
        FirstName: "Haris",
        Title: "Manager",
        BirthDate: "1993-07-07T22:00:00.000Z",
        HireDate: "2022-07-07T22:00:00.000Z",
        Address: "Hum",
        City: "Sarajevo",
        Country: "BiH",
        PostalCode: "71000",
        Phone: "1-212-456-7890",
        Email: "haris.kulas1@gmail1.com",
        Password: "$2b$10$dbFh1Pt/x4W6vBpD5RY13OhmwKIZQdwomvIHjFK5M4hC5Ln9yQJO."
    };
    mockCtx.prisma.employee.findFirst.mockResolvedValue(result as any);
    
    await expect(service.findOne("haris.kulas1@gmail1.com")).resolves.toEqual(result);
  });
});
