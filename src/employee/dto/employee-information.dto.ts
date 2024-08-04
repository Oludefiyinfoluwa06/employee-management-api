import { IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

enum employeeType {
  FULLTIME = 'full-time',
  PARTTIME = 'part-time',
  CONTRACTOR = 'contractor',
  INTERN = 'intern',
}

export class PersonalInformationDto {
  fullName: string;

  @IsEnum(Gender)
  gender: Gender;
  physicalAddress: string;

  @IsEmail()
  emailAddress: string;

  @IsPhoneNumber()
  phoneNumber: string;
  dateOfBirth: Date;
}

export class EmploymentInformationDto {
  title: string;
  department: string;
  dateOfHire: Date;

  @IsEnum(employeeType)
  employmentType: string;
}

export class EducationalInformation {
  highestLevel: string;
  nameOfInstitution: string;
  degreeEarned: string;
  fieldOfStudy: string;
  graduationDate: Date;
}

export class EmergencyContactInformation {
  fullName: string;
  physicalAddress: string;

  @IsEmail()
  emailAddress: string;

  @IsPhoneNumber()
  phoneNumber: string;
  relationship: Date;
}
