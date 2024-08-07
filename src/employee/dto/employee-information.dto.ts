import { IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export class PersonalInformationDto {
  firstName: string;
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;
  physicalAddress: string;

  @IsEmail()
  emailAddress: string;

  @IsPhoneNumber()
  phoneNumber: string;
  dateOfBirth: Date;

  @IsPhoneNumber()
  emergencyPhoneNumber: string;
  educationalLevel: string;
}

export class EmploymentInformationDto {
  role: string;
  employmentStartDate: Date;
}

export class bankAccountInformationDto {
  bankName: string;
  bankAccountNumber: string;
  accountName: string;
}

export class NextOfKinInformationDto {
  fullName: string;

  @IsPhoneNumber()
  phoneNumber: string;
  relationship: string;
}
