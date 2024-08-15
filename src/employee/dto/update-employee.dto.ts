import { PartialType } from '@nestjs/mapped-types';
import { Gender } from './../../utils/constants';
import { CreateEmployeeDto } from './create-employee.dto';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsString()
  @IsOptional()
  physicalAddress: string;

  @IsEmail()
  @IsOptional()
  emailAddress: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsPhoneNumber()
  @IsOptional()
  emergencyPhoneNumber: string;

  @IsString()
  @IsOptional()
  educationalLevel: string;

  @IsString()
  @IsOptional()
  employmentRole: string;

  @IsDate()
  @IsOptional()
  employmentStartDate: Date;

  @IsString()
  @IsOptional()
  bankName: string;

  @IsNumber()
  @IsOptional()
  bankAccountNumber: string;

  @IsString()
  @IsOptional()
  accountName: string;

  @IsString()
  @IsOptional()
  nextOfKinFullName: string;

  @IsPhoneNumber()
  @IsOptional()
  nextOfKinPhoneNumber: string;

  @IsString()
  @IsOptional()
  nextOfKinRelationship: string;
}
