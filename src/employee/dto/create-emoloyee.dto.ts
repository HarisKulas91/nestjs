import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsMobilePhone, IsString, Matches, MaxLength, MinLength, IsDate, Validate } from 'class-validator';
import { IsUniqueConstraint } from '../../common/validators/unique.validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  Password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  LastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Address: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  BirthDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  HireDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  City: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  PostalCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMobilePhone()
  Phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsUniqueConstraint, ['employee'])
  Email: string;
}