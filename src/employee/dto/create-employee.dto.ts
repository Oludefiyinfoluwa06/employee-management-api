import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from './../../utils/constants';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  physicalAddress: string;

  @IsEmail()
  emailAddress: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsPhoneNumber()
  emergencyPhoneNumber: string;

  @IsString()
  educationalLevel: string;

  @IsString()
  employmentRole: string;

  @IsDate()
  @Type(() => Date)
  employmentStartDate: Date;

  @IsString()
  bankName: string;

  @IsNumber()
  bankAccountNumber: string;

  @IsString()
  accountName: string;

  @IsString()
  nextOfKinFullName: string;

  @IsPhoneNumber()
  nextOfKinPhoneNumber: string;

  @IsString()
  nextOfKinRelationship: string;
}
