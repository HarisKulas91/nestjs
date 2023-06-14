import { Controller, Post, Body } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-emoloyee.dto';
import { EmployeeService } from './employee.service';
import { Public } from '..//app.controller';
import { Employee } from '@prisma/client';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeDto } from './dto/employee.dto';
import { ResponseDto } from '../common/dto/ResponseDto.dto';

@Controller('employees')
export class EmployeeController {

  constructor(private employeeService: EmployeeService) {}

  @Post('/signup')
  @Public()
  @ApiTags('Employees')
  @ApiCreatedResponse({
    description: 'Signup response',
    type: EmployeeDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' , type: ResponseDto})
  @ApiResponse({ status: 500, description: 'Internal server error', type: ResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'integer',
          example: 400,
        },
        message: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        },
      },
    },
  })
  
  async create(@Body() createEmployeeDto: CreateEmployeeDto):Promise<Employee> {
    return await this.employeeService.create(createEmployeeDto)
  }
}