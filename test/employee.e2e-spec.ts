import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/prisma.service';
import { AppModule } from '../src/app.module';
import { EmployeeModule } from '../src/employee/employee.module';


describe('TrackController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        providers: [EmployeeModule, { provide: PrismaService, useValue: jest.fn() }]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'haris.kulas@gmail.com',
        password: 'HarisKulas!',
      });

    token = res.body.access_token;
  });

  it('/employees/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/employees/signup')
      .send({
        Password: "HarisKulas!",
        FirstName: "Haris",
        LastName: "Kulas",
        Email: "haris.kulas@gmail.com",
        Title: "Mr",
        City: "Sarajevo",
        Country: "BiH",
        PostalCode: "71000",
        Phone: "1-212-456-7890",
        HireDate: null,
        Address: "Hum",
        BirthDate: null
      })
      .expect(201)
      .set('Authorization', `Bearer ${token}`);
  });

});
