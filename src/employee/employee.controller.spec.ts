import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { CreateEmployeeDto } from './dto/create-emoloyee.dto';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  const user = {
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

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [EmployeeController],
    })
      .useMocker((token) => {
        if (token === EmployeeService) {
          return {
            create: jest.fn().mockResolvedValue(user),
          };
        }
      })
      .compile();
      controller = app.get<EmployeeController>(EmployeeController);
  });

  it('should return created employee', async () => {
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

    expect(await controller.create(createEmployeeDto)).toEqual(user);
  });
});
