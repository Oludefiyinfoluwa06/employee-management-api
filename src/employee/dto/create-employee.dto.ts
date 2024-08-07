import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  bankAccountInformationDto,
  EmploymentInformationDto,
  NextOfKinInformationDto,
  PersonalInformationDto,
} from './employee-information.dto';

export class CreateEmployeeDto {
  @ValidateNested()
  @Type(() => PersonalInformationDto)
  personal_information: PersonalInformationDto;

  @ValidateNested()
  @Type(() => EmploymentInformationDto)
  employment_information: EmploymentInformationDto;

  @ValidateNested()
  @Type(() => bankAccountInformationDto)
  bank_account_information: bankAccountInformationDto;

  @ValidateNested()
  @Type(() => NextOfKinInformationDto)
  next_of_kin_information: NextOfKinInformationDto;
}
