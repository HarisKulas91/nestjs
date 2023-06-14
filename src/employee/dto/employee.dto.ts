import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
  @ApiProperty()
  Id: number

  @ApiProperty()
  Password: string;

  @ApiProperty()
  FirstName: string;

  @ApiProperty()
  LastName: string;

  @ApiProperty()
  Title: string;

  @ApiProperty()
  Address: string;

  @ApiProperty()
  BirthDate: string;

  @ApiProperty()
  HireDate: string;

  @ApiProperty()
  City: string;

  @ApiProperty()
  Country: string;

  @ApiProperty()
  PostalCode: string;

  @ApiProperty()
  Phone: string;

  @ApiProperty()
  Email: string;
}