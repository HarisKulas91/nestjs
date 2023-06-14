import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-emoloyee.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto):Promise<Employee> {
    const saltOrRounds = 10;
    createEmployeeDto.Password = await bcrypt.hash(createEmployeeDto.Password, saltOrRounds);
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  async findOne(username: string): Promise<any> {
    return this.prisma.employee.findFirst({where: { Email:username }})
  }
}